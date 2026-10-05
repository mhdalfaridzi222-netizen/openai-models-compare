export type ModelStatus = 'ACTIVE' | 'PREVIEW' | 'DEPRECATED' | 'RETIRED' | 'UNKNOWN';

export type ModelCategory =
  | 'flagship'
  | 'reasoning'
  | 'coding'
  | 'image'
  | 'audio'
  | 'realtime'
  | 'embeddings'
  | 'moderation'
  | 'open-weight'
  | 'deprecated';

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
  lastUpdated: string;
  suitableFor: string[];
  notSuitableFor: string[];
  recommendedReplacement: string | null;
  benchmarks?: {
    sweBench?: number | null;
    mmluPro?: number | null;
    mathAime?: number | null;
    gpqaDiamond?: number | null;
  };
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
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown / HTML formatted text
  featuredImage?: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
}

export interface FAQItem {
  q: string;
  a: string;
  category?: string;
}
