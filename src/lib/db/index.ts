import {
  Model,
  ModelEntity,
  ModelCategory,
  ModelStatus,
  CapabilityValue,
  ModelCapabilityRecord,
  ModelPriceRecord,
  ModelSourceRecord,
  Article,
  CategoryInfo,
  ComparisonEntity,
  FAQItem,
  SyncLogEntity,
  AuditLogEntity,
  SiteSettingsEntity,
  SeoSettingsEntity,
  AdSettingsEntity
} from '@/types/model';
import { MODELS as INITIAL_MODELS } from '@/data/models';
import { CATEGORIES as INITIAL_CATEGORIES } from '@/data/categories';
import { ARTICLES as INITIAL_ARTICLES } from '@/data/articles';
import { COMPARISON_PRESETS as INITIAL_COMPARISONS, GENERAL_FAQS as INITIAL_FAQS } from '@/data/comparisons';
import { isSupabaseConfigured, createBrowserClient } from '@/lib/supabase/client';
import { createAdminClient, isServiceRoleConfigured } from '@/lib/supabase/admin';

// In-memory runtime cache for seamless operation and fast SSR/SSG
let memoryModels: Model[] = [...INITIAL_MODELS];
let memoryArticles: Article[] = [...INITIAL_ARTICLES];
let memoryFaqs: FAQItem[] = [...INITIAL_FAQS];
let memoryComparisons: ComparisonEntity[] = INITIAL_COMPARISONS.map(c => ({
  id: c.id,
  title: c.title,
  slug: c.slug,
  description: c.description,
  highlight: c.highlight,
  modelIds: c.modelIds,
  isFeatured: true
}));

let memorySyncLogs: SyncLogEntity[] = [
  {
    id: 'log-seed-1',
    operation: 'INITIAL_SYNC',
    status: 'SUCCESS',
    modelsProcessed: 27,
    modelsAdded: 27,
    modelsUpdated: 0,
    possiblyMissing: 0,
    durationMs: 420,
    source: 'OFFICIAL_DOCS',
    triggeredBy: 'SYSTEM_BOOT',
    createdAt: '2026-10-06T00:00:00.000Z'
  }
];

let memoryAuditLogs: AuditLogEntity[] = [
  {
    id: 'audit-seed-1',
    adminEmail: 'system@openai-models-compare.vercel.app',
    action: 'SYSTEM_INIT',
    entity: 'system',
    entityId: 'v2-upgrade',
    beforeState: null,
    afterState: { version: '2.0.0', status: 'READY' },
    notes: 'Inisialisasi sistem OpenAI Models Compare V2',
    createdAt: '2026-10-06T00:00:00.000Z'
  }
];

let memorySiteSettings: SiteSettingsEntity = {
  siteName: 'OpenAI Models Compare',
  tagline: 'Bandingkan Semua Model OpenAI dengan Mudah.',
  description: 'Ensiklopedia & portal komparasi independen terlengkap untuk semua model OpenAI: spesifikasi, kemampuan visi, coding, reasoning, context window, tolok ukur, dan kalkulator biaya API.',
  contactEmail: 'admin@alfaridzi.dev'
};

let memorySeoSettings: SeoSettingsEntity = {
  defaultTitle: 'OpenAI Models Compare — Bandingkan Semua Model OpenAI dengan Mudah.',
  defaultDescription: 'Ensiklopedia & portal komparasi independen terlengkap untuk semua model OpenAI: spesifikasi, kemampuan visi, coding, reasoning, context window, tolok ukur, dan kalkulator biaya API.',
  defaultOgImage: 'https://openai-models-compare.vercel.app/og.jpg',
  canonicalBase: 'https://openai-models-compare.vercel.app',
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || undefined
};

let memoryAdSettings: AdSettingsEntity = {
  adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-5683117405667471',
  isEnabled: true,
  slotHeader: 'header-top',
  slotArticleTop: 'art-top',
  slotArticleMiddle: 'art-mid',
  slotArticleBottom: 'art-bot',
  slotSidebar: 'sidebar',
  slotFooter: 'footer'
};

// ========================================================================
// 1. MODELS DATA ACCESS
// ========================================================================

export async function getAllModels(options?: {
  category?: string;
  status?: ModelStatus;
  includePrivate?: boolean;
}): Promise<Model[]> {
  try {
    if (isSupabaseConfigured()) {
      const client = isServiceRoleConfigured() ? createAdminClient() : createBrowserClient();
      let query = client.from('models').select('*, model_capabilities(*), model_prices(*)');
      
      if (!options?.includePrivate) {
        query = query.eq('is_public', true);
      }
      if (options?.category && options.category !== 'all') {
        query = query.eq('category_id', options.category);
      }
      if (options?.status) {
        query = query.eq('status', options.status);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        // Map Supabase rows to Model interface
        return data.map((row: any) => {
          const caps = row.model_capabilities?.[0] || row.model_capabilities;
          const currentPrice = row.model_prices?.find((p: any) => p.is_current) || row.model_prices?.[0];

          return {
            id: row.id,
            name: row.name,
            slug: row.slug,
            modelId: row.model_id,
            family: row.family,
            category: row.category_id as ModelCategory,
            description: row.description,
            shortDescription: row.short_description,
            reasoning: caps ? caps.reasoning === 'SUPPORTED' : false,
            contextWindow: row.context_window,
            maxOutputTokens: row.max_output_tokens,
            inputPrice: currentPrice ? Number(currentPrice.input_price_per_1m) : null,
            cachedInputPrice: currentPrice ? Number(currentPrice.cached_input_price_per_1m) : null,
            outputPrice: currentPrice ? Number(currentPrice.output_price_per_1m) : null,
            batchInputPrice: currentPrice ? Number(currentPrice.batch_input_price_per_1m) : null,
            batchOutputPrice: currentPrice ? Number(currentPrice.batch_output_price_per_1m) : null,
            knowledgeCutoff: row.knowledge_cutoff,
            imageInput: caps ? caps.image_input === 'SUPPORTED' : false,
            imageGeneration: caps ? caps.image_output === 'SUPPORTED' : false,
            audioInput: caps ? caps.audio_input === 'SUPPORTED' : false,
            audioOutput: caps ? caps.audio_output === 'SUPPORTED' : false,
            vision: caps ? caps.vision === 'SUPPORTED' : false,
            functionCalling: caps ? caps.function_calling === 'SUPPORTED' : true,
            structuredOutputs: caps ? caps.structured_outputs === 'SUPPORTED' : true,
            webSearch: caps ? caps.web_search === 'SUPPORTED' : false,
            fileSearch: caps ? caps.file_search === 'SUPPORTED' : false,
            computerUse: caps ? caps.computer_use === 'SUPPORTED' : false,
            status: row.status as ModelStatus,
            releaseDate: row.release_date,
            deprecatedDate: row.deprecated_date,
            shutdownDate: row.shutdown_date,
            officialUrl: row.official_url,
            documentationUrl: row.documentation_url,
            lastUpdated: row.updated_at ? new Date(row.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '6 Oktober 2026',
            lastVerifiedAt: row.last_verified_at || '2026-10-06T00:00:00.000Z',
            lastSyncedAt: row.last_synced_at,
            isPossiblyMissing: row.is_possibly_missing,
            isFeatured: row.is_featured,
            isPublic: row.is_public,
            suitableFor: row.suitable_for || [],
            notSuitableFor: row.not_suitable_for || [],
            recommendedReplacement: row.recommended_replacement,
            capabilitiesRecord: caps,
            priceRecord: currentPrice
          };
        });
      }
    }
  } catch (err) {
    // Graceful fallback to memory models
  }

  // Fallback to memory
  let filtered = [...memoryModels];
  if (!options?.includePrivate) {
    filtered = filtered.filter(m => m.isPublic !== false);
  }
  if (options?.category && options.category !== 'all') {
    filtered = filtered.filter(m => m.category === options.category);
  }
  if (options?.status) {
    filtered = filtered.filter(m => m.status === options.status);
  }
  return filtered;
}

export async function getModelBySlug(slug: string): Promise<Model | undefined> {
  const models = await getAllModels({ includePrivate: true });
  const clean = slug.toLowerCase();
  return models.find(m => m.slug.toLowerCase() === clean || m.id.toLowerCase() === clean || m.modelId.toLowerCase() === clean);
}

export async function getModelById(id: string): Promise<Model | undefined> {
  const models = await getAllModels({ includePrivate: true });
  return models.find(m => m.id === id);
}

export async function saveOrUpdateModel(model: Partial<Model>, adminEmail: string): Promise<Model> {
  const existingIndex = memoryModels.findIndex(m => m.id === model.id);
  const now = new Date().toISOString();
  const dateFormatted = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  let updatedModel: Model;

  if (existingIndex >= 0) {
    const old = memoryModels[existingIndex];
    updatedModel = {
      ...old,
      ...model,
      lastUpdated: dateFormatted,
      lastVerifiedAt: now
    } as Model;
    memoryModels[existingIndex] = updatedModel;

    await insertAuditLog({
      adminEmail,
      action: 'UPDATE_MODEL',
      entity: 'models',
      entityId: updatedModel.id,
      beforeState: old as any,
      afterState: updatedModel as any,
      notes: `Model ${updatedModel.name} diperbarui oleh ${adminEmail}`
    });
  } else {
    updatedModel = {
      id: model.id || model.slug || `model-${Date.now()}`,
      name: model.name || 'New Model',
      slug: model.slug || (model.id ? model.id.toLowerCase() : `model-${Date.now()}`),
      modelId: model.modelId || model.id || 'new-model',
      family: model.family || 'OpenAI',
      category: model.category || 'flagship',
      description: model.description || '',
      shortDescription: model.shortDescription || '',
      reasoning: Boolean(model.reasoning),
      contextWindow: model.contextWindow || 128000,
      maxOutputTokens: model.maxOutputTokens || 16384,
      inputPrice: model.inputPrice !== undefined ? model.inputPrice : null,
      cachedInputPrice: model.cachedInputPrice !== undefined ? model.cachedInputPrice : null,
      outputPrice: model.outputPrice !== undefined ? model.outputPrice : null,
      knowledgeCutoff: model.knowledgeCutoff || 'Terbaru',
      imageInput: Boolean(model.imageInput),
      imageGeneration: Boolean(model.imageGeneration),
      audioInput: Boolean(model.audioInput),
      audioOutput: Boolean(model.audioOutput),
      vision: Boolean(model.vision),
      functionCalling: model.functionCalling !== undefined ? model.functionCalling : true,
      structuredOutputs: model.structuredOutputs !== undefined ? model.structuredOutputs : true,
      webSearch: Boolean(model.webSearch),
      fileSearch: Boolean(model.fileSearch),
      computerUse: Boolean(model.computerUse),
      status: model.status || 'ACTIVE',
      releaseDate: model.releaseDate || dateFormatted,
      deprecatedDate: model.deprecatedDate || null,
      shutdownDate: model.shutdownDate || null,
      officialUrl: model.officialUrl || 'https://platform.openai.com/docs/models',
      lastUpdated: dateFormatted,
      lastVerifiedAt: now,
      suitableFor: model.suitableFor || [],
      notSuitableFor: model.notSuitableFor || [],
      recommendedReplacement: model.recommendedReplacement || null,
      isFeatured: Boolean(model.isFeatured),
      isPublic: model.isPublic !== undefined ? model.isPublic : true
    };
    memoryModels.unshift(updatedModel);

    await insertAuditLog({
      adminEmail,
      action: 'CREATE_MODEL',
      entity: 'models',
      entityId: updatedModel.id,
      beforeState: null,
      afterState: updatedModel as any,
      notes: `Model baru ${updatedModel.name} dibuat oleh ${adminEmail}`
    });
  }

  // Sync to Supabase if configured
  if (isSupabaseConfigured() && isServiceRoleConfigured()) {
    try {
      const adminClient = createAdminClient();
      await adminClient.from('models').upsert({
        id: updatedModel.id,
        name: updatedModel.name,
        slug: updatedModel.slug,
        model_id: updatedModel.modelId,
        family: updatedModel.family,
        category_id: updatedModel.category,
        short_description: updatedModel.shortDescription,
        description: updatedModel.description,
        status: updatedModel.status,
        release_date: updatedModel.releaseDate,
        knowledge_cutoff: updatedModel.knowledgeCutoff,
        context_window: updatedModel.contextWindow,
        max_output_tokens: updatedModel.maxOutputTokens,
        official_url: updatedModel.officialUrl,
        suitable_for: updatedModel.suitableFor,
        not_suitable_for: updatedModel.notSuitableFor,
        recommended_replacement: updatedModel.recommendedReplacement,
        deprecated_date: updatedModel.deprecatedDate,
        shutdown_date: updatedModel.shutdownDate,
        is_featured: updatedModel.isFeatured,
        is_public: updatedModel.isPublic,
        last_verified_at: updatedModel.lastVerifiedAt,
        updated_at: now
      });
    } catch (e) {
      // Supabase write fallback
    }
  }

  return updatedModel;
}

// ========================================================================
// 2. ARTICLES DATA ACCESS
// ========================================================================

export async function getAllArticles(options?: {
  category?: string;
  status?: string;
}): Promise<Article[]> {
  try {
    if (isSupabaseConfigured()) {
      const client = isServiceRoleConfigured() ? createAdminClient() : createBrowserClient();
      let query = client.from('articles').select('*').order('published_at', { ascending: false });

      if (options?.category) {
        query = query.eq('category_id', options.category);
      }
      if (options?.status) {
        query = query.eq('status', options.status);
      } else {
        query = query.eq('status', 'PUBLISHED');
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id,
          title: row.title,
          slug: row.slug,
          excerpt: row.excerpt,
          content: row.content,
          featuredImage: row.featured_image,
          category: row.category_id,
          tags: row.tags || [],
          author: row.author,
          publishedAt: row.published_at ? new Date(row.published_at).toISOString().split('T')[0] : '2026-10-06',
          updatedAt: row.updated_at ? new Date(row.updated_at).toISOString().split('T')[0] : '2026-10-06',
          seoTitle: row.seo_title,
          seoDescription: row.seo_description,
          canonicalUrl: row.canonical_url || `https://openai-models-compare.vercel.app/articles/${row.slug}`,
          status: row.status,
          relatedModelIds: row.related_model_ids
        }));
      }
    }
  } catch (err) {
    // fallback
  }

  let articles = [...memoryArticles];
  if (options?.category) {
    articles = articles.filter(a => a.category.toLowerCase().includes(options.category!.toLowerCase()));
  }
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getAllArticles({ status: 'ALL' });
  return articles.find(a => a.slug === slug);
}

export async function saveOrUpdateArticle(article: Partial<Article>, adminEmail: string): Promise<Article> {
  const existingIdx = memoryArticles.findIndex(a => a.slug === article.slug || (article.id && a.id === article.id));
  const now = new Date().toISOString();
  const dateStr = now.split('T')[0];

  let savedArticle: Article;
  if (existingIdx >= 0) {
    const old = memoryArticles[existingIdx];
    savedArticle = {
      ...old,
      ...article,
      updatedAt: dateStr
    } as Article;
    memoryArticles[existingIdx] = savedArticle;

    await insertAuditLog({
      adminEmail,
      action: 'UPDATE_ARTICLE',
      entity: 'articles',
      entityId: savedArticle.slug,
      beforeState: old as any,
      afterState: savedArticle as any,
      notes: `Artikel ${savedArticle.title} diperbarui oleh ${adminEmail}`
    });
  } else {
    savedArticle = {
      id: `art-${Date.now()}`,
      title: article.title || 'Judul Baru',
      slug: article.slug || `artikel-${Date.now()}`,
      excerpt: article.excerpt || '',
      content: article.content || '',
      category: article.category || 'Panduan Dasar',
      tags: article.tags || ['OpenAI'],
      author: article.author || 'Tim Peneliti OpenAI Models Compare',
      publishedAt: article.publishedAt || dateStr,
      updatedAt: dateStr,
      seoTitle: article.seoTitle || article.title || 'Panduan OpenAI',
      seoDescription: article.seoDescription || article.excerpt || '',
      canonicalUrl: article.canonicalUrl || `https://openai-models-compare.vercel.app/articles/${article.slug}`,
      status: article.status || 'PUBLISHED',
      relatedModelIds: article.relatedModelIds || []
    };
    memoryArticles.unshift(savedArticle);

    await insertAuditLog({
      adminEmail,
      action: 'CREATE_ARTICLE',
      entity: 'articles',
      entityId: savedArticle.slug,
      beforeState: null,
      afterState: savedArticle as any,
      notes: `Artikel baru ${savedArticle.title} dibuat oleh ${adminEmail}`
    });
  }

  return savedArticle;
}

// ========================================================================
// 3. CATEGORIES & FAQS
// ========================================================================

export async function getCategories(): Promise<CategoryInfo[]> {
  return INITIAL_CATEGORIES;
}

export async function getFaqs(): Promise<FAQItem[]> {
  return memoryFaqs;
}

export async function saveFaq(faq: FAQItem, adminEmail: string): Promise<FAQItem> {
  const existingIdx = memoryFaqs.findIndex(f => f.q === faq.q || (faq.id && f.id === faq.id));
  if (existingIdx >= 0) {
    memoryFaqs[existingIdx] = { ...memoryFaqs[existingIdx], ...faq };
    await insertAuditLog({
      adminEmail,
      action: 'UPDATE_FAQ',
      entity: 'faqs',
      entityId: faq.q,
      notes: `FAQ diperbarui oleh ${adminEmail}`
    });
  } else {
    memoryFaqs.push({ ...faq, id: `faq-${Date.now()}`, isPublished: true });
    await insertAuditLog({
      adminEmail,
      action: 'CREATE_FAQ',
      entity: 'faqs',
      entityId: faq.q,
      notes: `FAQ baru dibuat oleh ${adminEmail}`
    });
  }
  return faq;
}

// ========================================================================
// 4. COMPARISONS
// ========================================================================

export async function getComparisons(): Promise<ComparisonEntity[]> {
  return memoryComparisons;
}

export async function getComparisonBySlug(slug: string): Promise<ComparisonEntity | undefined> {
  return memoryComparisons.find(c => c.slug === slug);
}

// ========================================================================
// 5. SETTINGS
// ========================================================================

export async function getSiteSettings(): Promise<SiteSettingsEntity> {
  return memorySiteSettings;
}

export async function updateSiteSettings(settings: Partial<SiteSettingsEntity>, adminEmail: string): Promise<SiteSettingsEntity> {
  memorySiteSettings = { ...memorySiteSettings, ...settings };
  await insertAuditLog({
    adminEmail,
    action: 'UPDATE_SITE_SETTINGS',
    entity: 'site_settings',
    entityId: 'general',
    afterState: memorySiteSettings as any,
    notes: `Pengaturan situs diperbarui oleh ${adminEmail}`
  });
  return memorySiteSettings;
}

export async function getSeoSettings(): Promise<SeoSettingsEntity> {
  return memorySeoSettings;
}

export async function updateSeoSettings(settings: Partial<SeoSettingsEntity>, adminEmail: string): Promise<SeoSettingsEntity> {
  memorySeoSettings = { ...memorySeoSettings, ...settings };
  await insertAuditLog({
    adminEmail,
    action: 'UPDATE_SEO_SETTINGS',
    entity: 'seo_settings',
    entityId: 'default',
    afterState: memorySeoSettings as any,
    notes: `Pengaturan SEO diperbarui oleh ${adminEmail}`
  });
  return memorySeoSettings;
}

export async function getAdSettings(): Promise<AdSettingsEntity> {
  return memoryAdSettings;
}

export async function updateAdSettings(settings: Partial<AdSettingsEntity>, adminEmail: string): Promise<AdSettingsEntity> {
  memoryAdSettings = { ...memoryAdSettings, ...settings };
  await insertAuditLog({
    adminEmail,
    action: 'UPDATE_AD_SETTINGS',
    entity: 'ad_settings',
    entityId: 'default',
    afterState: memoryAdSettings as any,
    notes: `Pengaturan AdSense diperbarui oleh ${adminEmail}`
  });
  return memoryAdSettings;
}

// ========================================================================
// 6. LOGS (SYNC & AUDIT)
// ========================================================================

export async function getSyncLogs(limit: number = 50): Promise<SyncLogEntity[]> {
  return memorySyncLogs.slice(0, limit);
}

export async function insertSyncLog(log: Omit<SyncLogEntity, 'id' | 'createdAt'>): Promise<SyncLogEntity> {
  const newLog: SyncLogEntity = {
    id: `sync-log-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...log
  };
  memorySyncLogs.unshift(newLog);

  if (isSupabaseConfigured() && isServiceRoleConfigured()) {
    try {
      const adminClient = createAdminClient();
      await adminClient.from('sync_logs').insert({
        operation: newLog.operation,
        status: newLog.status,
        models_processed: newLog.modelsProcessed,
        models_added: newLog.modelsAdded,
        models_updated: newLog.modelsUpdated,
        possibly_missing: newLog.possiblyMissing,
        errors: newLog.errors,
        duration_ms: newLog.durationMs,
        source: newLog.source,
        triggered_by: newLog.triggeredBy
      });
    } catch (e) {
      // fallback
    }
  }

  return newLog;
}

export async function getAuditLogs(limit: number = 50): Promise<AuditLogEntity[]> {
  return memoryAuditLogs.slice(0, limit);
}

export async function insertAuditLog(log: Omit<AuditLogEntity, 'id' | 'createdAt'>): Promise<AuditLogEntity> {
  const newLog: AuditLogEntity = {
    id: `audit-log-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...log
  };
  memoryAuditLogs.unshift(newLog);

  if (isSupabaseConfigured() && isServiceRoleConfigured()) {
    try {
      const adminClient = createAdminClient();
      await adminClient.from('audit_logs').insert({
        admin_email: newLog.adminEmail,
        action: newLog.action,
        entity: newLog.entity,
        entity_id: newLog.entityId,
        before_state: newLog.beforeState,
        after_state: newLog.afterState,
        notes: newLog.notes
      });
    } catch (e) {
      // fallback
    }
  }

  return newLog;
}
