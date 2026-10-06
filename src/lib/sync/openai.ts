import OpenAI from 'openai';
import { getAllModels, saveOrUpdateModel, insertSyncLog } from '@/lib/db';
import { Model } from '@/types/model';

export interface SyncResult {
  success: boolean;
  modelsProcessed: number;
  modelsAdded: number;
  modelsUpdated: number;
  possiblyMissing: number;
  durationMs: number;
  errors?: string | null;
  message: string;
}

export async function runOpenAIModelSync(triggeredBy: string = 'ADMIN'): Promise<SyncResult> {
  const startTime = Date.now();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    const durationMs = Date.now() - startTime;
    const msg = 'OPENAI_API_KEY belum dikonfigurasi di environment variables server. Sinkronisasi dibatalkan secara aman tanpa mengubah data.';
    
    await insertSyncLog({
      operation: 'MODELS_SYNC',
      status: 'PARTIAL',
      modelsProcessed: 0,
      modelsAdded: 0,
      modelsUpdated: 0,
      possiblyMissing: 0,
      errors: 'Missing OPENAI_API_KEY',
      durationMs,
      source: 'OFFICIAL_API',
      triggeredBy
    });

    return {
      success: false,
      modelsProcessed: 0,
      modelsAdded: 0,
      modelsUpdated: 0,
      possiblyMissing: 0,
      durationMs,
      errors: 'Missing OPENAI_API_KEY',
      message: msg
    };
  }

  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.models.list();
    const apiModels = response.data || [];

    const existingModels = await getAllModels({ includePrivate: true });
    const existingModelIds = new Set(existingModels.map(m => m.modelId.toLowerCase()));
    const apiModelIds = new Set(apiModels.map(m => m.id.toLowerCase()));

    let modelsAdded = 0;
    let modelsUpdated = 0;
    let possiblyMissing = 0;

    const nowIso = new Date().toISOString();

    // 1. Process models returned by API
    for (const apiModel of apiModels) {
      const modelId = apiModel.id;
      const lowerId = modelId.toLowerCase();

      if (existingModelIds.has(lowerId)) {
        // Update existing model sync time
        const existing = existingModels.find(m => m.modelId.toLowerCase() === lowerId);
        if (existing) {
          await saveOrUpdateModel({
            ...existing,
            lastSyncedAt: nowIso,
            isPossiblyMissing: false
          }, triggeredBy);
          modelsUpdated++;
        }
      } else {
        // New model detected in official API!
        // Derive clean family & display name
        const displayName = modelId
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.slice(1))
          .join(' ');

        await saveOrUpdateModel({
          id: modelId.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          name: displayName,
          slug: modelId.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          modelId: modelId,
          family: modelId.startsWith('o1') || modelId.startsWith('o3') ? 'o-series' : 'GPT',
          category: modelId.includes('embed') ? 'embeddings' : modelId.includes('dall') ? 'image' : modelId.includes('tts') || modelId.includes('whisper') ? 'audio' : 'flagship',
          description: `Model OpenAI terdeteksi otomatis dari endpoint resmi OpenAI Models API (/v1/models) pada ${new Date().toLocaleDateString('id-ID')}.`,
          shortDescription: `Model OpenAI resmi (${modelId}) terdeteksi dari OpenAI API.`,
          status: 'ACTIVE',
          releaseDate: new Date(apiModel.created * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          knowledgeCutoff: 'Terverifikasi via API',
          contextWindow: 128000,
          maxOutputTokens: 16384,
          inputPrice: null,
          cachedInputPrice: null,
          outputPrice: null,
          reasoning: modelId.startsWith('o1') || modelId.startsWith('o3'),
          imageInput: false,
          imageGeneration: modelId.includes('dall'),
          audioInput: modelId.includes('whisper'),
          audioOutput: modelId.includes('tts'),
          vision: false,
          functionCalling: true,
          structuredOutputs: true,
          webSearch: false,
          fileSearch: false,
          computerUse: false,
          officialUrl: `https://platform.openai.com/docs/models/${modelId}`,
          suitableFor: ['Panggilan API OpenAI'],
          notSuitableFor: [],
          recommendedReplacement: null,
          deprecatedDate: null,
          shutdownDate: null,
          lastSyncedAt: nowIso,
          isPossiblyMissing: false,
          isPublic: true,
          isFeatured: false
        }, triggeredBy);
        modelsAdded++;
      }
    }

    // 2. Mark possibly_missing for active models not found in API response
    for (const em of existingModels) {
      if (em.status === 'ACTIVE' && !apiModelIds.has(em.modelId.toLowerCase())) {
        await saveOrUpdateModel({
          ...em,
          isPossiblyMissing: true
        }, triggeredBy);
        possiblyMissing++;
      }
    }

    const durationMs = Date.now() - startTime;
    await insertSyncLog({
      operation: 'MODELS_SYNC',
      status: 'SUCCESS',
      modelsProcessed: apiModels.length,
      modelsAdded,
      modelsUpdated,
      possiblyMissing,
      durationMs,
      source: 'OFFICIAL_API',
      triggeredBy
    });

    return {
      success: true,
      modelsProcessed: apiModels.length,
      modelsAdded,
      modelsUpdated,
      possiblyMissing,
      durationMs,
      message: `Sinkronisasi berhasil! ${apiModels.length} model diproses: ${modelsAdded} model baru ditambahkan, ${modelsUpdated} diperbarui, ${possiblyMissing} ditandai possibly missing.`
    };
  } catch (err: any) {
    const durationMs = Date.now() - startTime;
    const errorMsg = err?.message || 'Gagal menghubungi OpenAI Models API';

    await insertSyncLog({
      operation: 'MODELS_SYNC',
      status: 'FAILED',
      modelsProcessed: 0,
      modelsAdded: 0,
      modelsUpdated: 0,
      possiblyMissing: 0,
      errors: errorMsg,
      durationMs,
      source: 'OFFICIAL_API',
      triggeredBy
    });

    return {
      success: false,
      modelsProcessed: 0,
      modelsAdded: 0,
      modelsUpdated: 0,
      possiblyMissing: 0,
      durationMs,
      errors: errorMsg,
      message: `Sinkronisasi gagal: ${errorMsg}`
    };
  }
}
