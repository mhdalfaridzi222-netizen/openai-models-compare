import { getAllModels, saveOrUpdateModel, insertSyncLog } from '@/lib/db';

export interface PricingSyncResult {
  success: boolean;
  modelsVerified: number;
  pricesUpdated: number;
  durationMs: number;
  message: string;
}

// Official OpenAI pricing reference source
export const OFFICIAL_OPENAI_PRICING_TABLE: Record<string, {
  inputPrice: number;
  cachedInputPrice: number;
  outputPrice: number;
  sourceUrl: string;
}> = {
  'gpt-4o': {
    inputPrice: 2.50,
    cachedInputPrice: 1.25,
    outputPrice: 10.00,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'gpt-4o-mini': {
    inputPrice: 0.15,
    cachedInputPrice: 0.075,
    outputPrice: 0.60,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'gpt-4-turbo': {
    inputPrice: 10.00,
    cachedInputPrice: 10.00,
    outputPrice: 30.00,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'o3-mini': {
    inputPrice: 1.10,
    cachedInputPrice: 0.55,
    outputPrice: 4.40,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'o1': {
    inputPrice: 15.00,
    cachedInputPrice: 7.50,
    outputPrice: 60.00,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'o1-mini': {
    inputPrice: 1.10,
    cachedInputPrice: 0.55,
    outputPrice: 4.40,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'o1-preview': {
    inputPrice: 15.00,
    cachedInputPrice: 15.00,
    outputPrice: 60.00,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'text-embedding-3-small': {
    inputPrice: 0.02,
    cachedInputPrice: 0.02,
    outputPrice: 0.00,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'text-embedding-3-large': {
    inputPrice: 0.13,
    cachedInputPrice: 0.13,
    outputPrice: 0.00,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'text-embedding-ada-002': {
    inputPrice: 0.10,
    cachedInputPrice: 0.10,
    outputPrice: 0.00,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'gpt-3.5-turbo': {
    inputPrice: 0.50,
    cachedInputPrice: 0.50,
    outputPrice: 1.50,
    sourceUrl: 'https://openai.com/api/pricing/'
  },
  'gpt-3.5-turbo-instruct': {
    inputPrice: 1.50,
    cachedInputPrice: 1.50,
    outputPrice: 2.00,
    sourceUrl: 'https://openai.com/api/pricing/'
  }
};

export async function verifyAndSyncPricing(triggeredBy: string = 'ADMIN'): Promise<PricingSyncResult> {
  const startTime = Date.now();
  const models = await getAllModels({ includePrivate: true });

  let modelsVerified = 0;
  let pricesUpdated = 0;

  for (const m of models) {
    const verifiedPrice = OFFICIAL_OPENAI_PRICING_TABLE[m.modelId] || OFFICIAL_OPENAI_PRICING_TABLE[m.id];
    if (verifiedPrice) {
      modelsVerified++;
      const hasChanged =
        m.inputPrice !== verifiedPrice.inputPrice ||
        m.cachedInputPrice !== verifiedPrice.cachedInputPrice ||
        m.outputPrice !== verifiedPrice.outputPrice;

      if (hasChanged) {
        await saveOrUpdateModel({
          ...m,
          inputPrice: verifiedPrice.inputPrice,
          cachedInputPrice: verifiedPrice.cachedInputPrice,
          outputPrice: verifiedPrice.outputPrice,
          batchInputPrice: verifiedPrice.inputPrice * 0.5,
          batchOutputPrice: verifiedPrice.outputPrice * 0.5,
          lastVerifiedAt: new Date().toISOString()
        }, triggeredBy);
        pricesUpdated++;
      }
    }
  }

  const durationMs = Date.now() - startTime;

  await insertSyncLog({
    operation: 'PRICING_SYNC',
    status: 'SUCCESS',
    modelsProcessed: modelsVerified,
    modelsAdded: 0,
    modelsUpdated: pricesUpdated,
    possiblyMissing: 0,
    durationMs,
    source: 'OFFICIAL_PRICING',
    triggeredBy
  });

  return {
    success: true,
    modelsVerified,
    pricesUpdated,
    durationMs,
    message: `Verifikasi tarif resmi OpenAI selesai: ${modelsVerified} model diverifikasi, ${pricesUpdated} tarif disinkronisasi.`
  };
}
