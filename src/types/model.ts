export * from './database';

import {
  ModelStatus,
  ModelCategory,
  CapabilityValue,
  ModelCapabilityRecord,
  ModelPriceRecord,
  ModelSourceRecord,
  ModelEntity
} from './database';

export interface Model {
  id: string;
  name: string;
  slug: string;
  modelId: string;
  family: string;
  category: ModelCategory;
  description: string;
  shortDescription: string;
  reasoning: boolean;
  contextWindow: number | null;
  maxOutputTokens: number | null;
  inputPrice: number | null; // USD per 1M tokens
  cachedInputPrice: number | null; // USD per 1M tokens
  outputPrice: number | null; // USD per 1M tokens
  batchInputPrice?: number | null;
  batchOutputPrice?: number | null;
  knowledgeCutoff: string;
  imageInput: boolean;
  imageGeneration: boolean;
  audioInput: boolean;
  audioOutput: boolean;
  vision: boolean;
  functionCalling: boolean;
  structuredOutputs: boolean;
  webSearch: boolean;
  fileSearch: boolean;
  computerUse: boolean;
  status: ModelStatus;
  releaseDate: string;
  deprecatedDate: string | null;
  shutdownDate: string | null;
  officialUrl: string;
  documentationUrl?: string;
  lastUpdated: string;
  lastVerifiedAt?: string;
  lastSyncedAt?: string | null;
  isPossiblyMissing?: boolean;
  isFeatured?: boolean;
  isPublic?: boolean;
  suitableFor: string[];
  notSuitableFor: string[];
  recommendedReplacement: string | null;
  benchmarks?: {
    sweBench?: number | null;
    mmluPro?: number | null;
    mathAime?: number | null;
    gpqaDiamond?: number | null;
  };
  // Detailed V2 capabilities & sources
  capabilitiesRecord?: ModelCapabilityRecord;
  sourcesList?: ModelSourceRecord[];
  priceRecord?: ModelPriceRecord | null;
}

export interface CategoryInfo {
  id: ModelCategory;
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  description: string;
  badgeColor: string;
}

export interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  relatedModelIds?: string[];
}

export interface FAQItem {
  id?: string;
  q: string;
  a: string;
  category?: string;
  sortOrder?: number;
  isPublished?: boolean;
}
