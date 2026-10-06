// ========================================================================
// OPENAI MODELS COMPARE V2 - DATABASE & DOMAIN TYPES
// ========================================================================

export type ModelStatus = 'ACTIVE' | 'PREVIEW' | 'DEPRECATED' | 'RETIRED' | 'UNKNOWN';

export type CapabilityValue = 'SUPPORTED' | 'NOT_SUPPORTED' | 'UNKNOWN';

export type SourceType =
  | 'OFFICIAL_DOCS'
  | 'OFFICIAL_API'
  | 'OFFICIAL_PRICING'
  | 'OFFICIAL_DEPRECATION'
  | 'OTHER';

export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

export type SyncStatus = 'SUCCESS' | 'PARTIAL' | 'FAILED';

export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

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

export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: ModelCategory | string;
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  description: string;
  badgeColor: string;
  sortOrder?: number;
}

export interface ModelCapabilityRecord {
  id?: string;
  modelId: string;
  textInput: CapabilityValue;
  textOutput: CapabilityValue;
  imageInput: CapabilityValue;
  imageOutput: CapabilityValue;
  audioInput: CapabilityValue;
  audioOutput: CapabilityValue;
  videoInput: CapabilityValue;
  reasoning: CapabilityValue;
  vision: CapabilityValue;
  functionCalling: CapabilityValue;
  structuredOutputs: CapabilityValue;
  streaming: CapabilityValue;
  webSearch: CapabilityValue;
  fileSearch: CapabilityValue;
  computerUse: CapabilityValue;
  realtime: CapabilityValue;
  embeddings: CapabilityValue;
  moderation: CapabilityValue;
  otherCapabilities?: Record<string, unknown>;
  sourceUrl?: string;
  verifiedAt: string;
}

export interface ModelPriceRecord {
  id?: string;
  modelId: string;
  inputPricePer1M: number | null;
  cachedInputPricePer1M: number | null;
  outputPricePer1M: number | null;
  batchInputPricePer1M: number | null;
  batchOutputPricePer1M: number | null;
  currency: string;
  effectiveFrom: string;
  effectiveUntil: string | null;
  sourceUrl?: string;
  verifiedAt: string;
  isCurrent: boolean;
}

export interface ModelSourceRecord {
  id?: string;
  modelId: string;
  sourceType: SourceType;
  sourceUrl: string;
  sourceTitle: string;
  checkedAt: string;
  notes?: string;
}

export interface ModelStatusHistoryRecord {
  id?: string;
  modelId: string;
  oldStatus: ModelStatus | null;
  newStatus: ModelStatus;
  changedBy: string | null;
  reason?: string;
  sourceUrl?: string;
  createdAt: string;
}

// Complete Model Entity used in UI and Database
export interface ModelEntity {
  id: string;
  name: string; // Display Name, e.g. "GPT-4o"
  slug: string; // URL Slug, e.g. "gpt-4o"
  modelId: string; // Official API ID, e.g. "gpt-4o"
  family: string; // e.g. "GPT-4o"
  category: ModelCategory;
  shortDescription: string;
  description: string;
  status: ModelStatus;
  releaseDate: string;
  knowledgeCutoff: string;
  contextWindow: number | null;
  maxOutputTokens: number | null;
  inputModalities: string[];
  outputModalities: string[];
  officialUrl: string;
  documentationUrl?: string;
  suitableFor: string[];
  notSuitableFor: string[];
  recommendedReplacement: string | null;
  deprecatedDate: string | null;
  shutdownDate: string | null;
  isFeatured: boolean;
  isPublic: boolean;
  isPossiblyMissing?: boolean;
  lastVerifiedAt: string;
  lastSyncedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;

  // Joined / Associated data
  capabilities: ModelCapabilityRecord;
  currentPrice: ModelPriceRecord | null;
  priceHistory?: ModelPriceRecord[];
  sources?: ModelSourceRecord[];
  statusHistory?: ModelStatusHistoryRecord[];
  benchmarks?: {
    sweBench?: number | null;
    mmluPro?: number | null;
    mathAime?: number | null;
    gpqaDiamond?: number | null;
  };
}

export interface ArticleEntity {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  categoryId: string;
  tags: string[];
  author: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl?: string;
  status: ArticleStatus;
  relatedModelIds?: string[];
  publishedAt: string;
  updatedAt: string;
}

export interface ComparisonEntity {
  id: string;
  title: string;
  slug: string;
  description: string;
  highlight: string;
  modelIds: string[];
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface FAQEntity {
  id: string;
  q: string;
  a: string;
  category?: string;
  relatedModelId?: string;
  sortOrder?: number;
  isPublished?: boolean;
}

export interface SyncLogEntity {
  id: string;
  operation: string;
  status: SyncStatus;
  modelsProcessed: number;
  modelsAdded: number;
  modelsUpdated: number;
  possiblyMissing: number;
  errors?: string | null;
  durationMs: number;
  source: string;
  triggeredBy: string;
  createdAt: string;
}

export interface AuditLogEntity {
  id: string;
  adminEmail: string;
  action: string;
  entity: string;
  entityId: string;
  beforeState?: Record<string, unknown> | null;
  afterState?: Record<string, unknown> | null;
  notes?: string | null;
  createdAt: string;
}

export interface SiteSettingsEntity {
  siteName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  logoUrl?: string;
  faviconUrl?: string;
}

export interface SeoSettingsEntity {
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  canonicalBase: string;
  googleAnalyticsId?: string;
}

export interface AdSettingsEntity {
  adsensePublisherId: string;
  isEnabled: boolean;
  slotHeader?: string;
  slotArticleTop?: string;
  slotArticleMiddle?: string;
  slotArticleBottom?: string;
  slotSidebar?: string;
  slotFooter?: string;
}
