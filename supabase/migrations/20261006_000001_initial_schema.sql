-- ========================================================================
-- OPENAI MODELS COMPARE V2 - DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Migration: 20261006_000001_initial_schema.sql
-- ========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------
-- 1. ENUMS
-- ------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE model_status_enum AS ENUM ('ACTIVE', 'PREVIEW', 'DEPRECATED', 'RETIRED', 'UNKNOWN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE capability_value_enum AS ENUM ('SUPPORTED', 'NOT_SUPPORTED', 'UNKNOWN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE source_type_enum AS ENUM ('OFFICIAL_DOCS', 'OFFICIAL_API', 'OFFICIAL_PRICING', 'OFFICIAL_DEPRECATION', 'OTHER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'EDITOR', 'VIEWER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE sync_status_enum AS ENUM ('SUCCESS', 'PARTIAL', 'FAILED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE article_status_enum AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------
-- 2. USER PROFILES & ROLES
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role user_role_enum NOT NULL DEFAULT 'VIEWER',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 3. CATEGORIES
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL DEFAULT '⚡',
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    badge_color TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 4. MODELS TABLE
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS models (
    id TEXT PRIMARY KEY, -- e.g. 'gpt-4o'
    name TEXT NOT NULL, -- Display Name: 'GPT-4o'
    slug TEXT NOT NULL UNIQUE, -- 'gpt-4o'
    model_id TEXT NOT NULL, -- Official API ID: 'gpt-4o'
    family TEXT NOT NULL, -- 'GPT-4o'
    category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    status model_status_enum NOT NULL DEFAULT 'ACTIVE',
    release_date TEXT NOT NULL,
    knowledge_cutoff TEXT NOT NULL,
    context_window INT, -- In tokens
    max_output_tokens INT, -- In tokens
    input_modalities TEXT[] DEFAULT ARRAY['text'],
    output_modalities TEXT[] DEFAULT ARRAY['text'],
    official_url TEXT NOT NULL,
    documentation_url TEXT,
    suitable_for TEXT[] DEFAULT ARRAY[]::TEXT[],
    not_suitable_for TEXT[] DEFAULT ARRAY[]::TEXT[],
    recommended_replacement TEXT,
    deprecated_date TEXT,
    shutdown_date TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    is_possibly_missing BOOLEAN NOT NULL DEFAULT FALSE,
    last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 5. MODEL CAPABILITIES (3-state: SUPPORTED, NOT_SUPPORTED, UNKNOWN)
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS model_capabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id TEXT NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    text_input capability_value_enum NOT NULL DEFAULT 'SUPPORTED',
    text_output capability_value_enum NOT NULL DEFAULT 'SUPPORTED',
    image_input capability_value_enum NOT NULL DEFAULT 'UNKNOWN',
    image_output capability_value_enum NOT NULL DEFAULT 'UNKNOWN',
    audio_input capability_value_enum NOT NULL DEFAULT 'UNKNOWN',
    audio_output capability_value_enum NOT NULL DEFAULT 'UNKNOWN',
    video_input capability_value_enum NOT NULL DEFAULT 'NOT_SUPPORTED',
    reasoning capability_value_enum NOT NULL DEFAULT 'NOT_SUPPORTED',
    vision capability_value_enum NOT NULL DEFAULT 'UNKNOWN',
    function_calling capability_value_enum NOT NULL DEFAULT 'SUPPORTED',
    structured_outputs capability_value_enum NOT NULL DEFAULT 'SUPPORTED',
    streaming capability_value_enum NOT NULL DEFAULT 'SUPPORTED',
    web_search capability_value_enum NOT NULL DEFAULT 'UNKNOWN',
    file_search capability_value_enum NOT NULL DEFAULT 'UNKNOWN',
    computer_use capability_value_enum NOT NULL DEFAULT 'NOT_SUPPORTED',
    realtime capability_value_enum NOT NULL DEFAULT 'NOT_SUPPORTED',
    embeddings capability_value_enum NOT NULL DEFAULT 'NOT_SUPPORTED',
    moderation capability_value_enum NOT NULL DEFAULT 'NOT_SUPPORTED',
    other_capabilities JSONB DEFAULT '{}'::JSONB,
    source_url TEXT,
    verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_model_capabilities UNIQUE (model_id)
);

-- ------------------------------------------------------------------------
-- 6. MODEL PRICES (Historical, Period-based)
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS model_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id TEXT NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    input_price_per_1m NUMERIC(10, 4), -- USD per 1M tokens
    cached_input_price_per_1m NUMERIC(10, 4), -- USD per 1M tokens
    output_price_per_1m NUMERIC(10, 4), -- USD per 1M tokens
    batch_input_price_per_1m NUMERIC(10, 4), -- USD per 1M tokens
    batch_output_price_per_1m NUMERIC(10, 4), -- USD per 1M tokens
    currency TEXT NOT NULL DEFAULT 'USD',
    effective_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    effective_until TIMESTAMPTZ, -- NULL means current price
    source_url TEXT,
    verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_current BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 7. MODEL STATUS HISTORY
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS model_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id TEXT NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    old_status model_status_enum,
    new_status model_status_enum NOT NULL,
    changed_by TEXT,
    reason TEXT,
    source_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 8. MODEL SOURCES
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS model_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id TEXT NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    source_type source_type_enum NOT NULL DEFAULT 'OFFICIAL_DOCS',
    source_url TEXT NOT NULL,
    source_title TEXT NOT NULL,
    checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 9. ARTICLES & ARTICLE CATEGORIES
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS article_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    category_id TEXT REFERENCES article_categories(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    author TEXT NOT NULL DEFAULT 'OpenAI Models Compare Research Team',
    seo_title TEXT NOT NULL,
    seo_description TEXT NOT NULL,
    canonical_url TEXT,
    status article_status_enum NOT NULL DEFAULT 'PUBLISHED',
    related_model_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 10. COMPARISONS & COMPARISON ITEMS
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS comparisons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    highlight TEXT NOT NULL,
    model_ids TEXT[] NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT TRUE,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comparison_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    comparison_id TEXT NOT NULL REFERENCES comparisons(id) ON DELETE CASCADE,
    model_id TEXT NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    position INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 11. FAQS
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    related_model_id TEXT REFERENCES models(id) ON DELETE SET NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 12. MEDIA
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 13. SETTINGS TABLES
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    default_title TEXT NOT NULL,
    default_description TEXT NOT NULL,
    default_og_image TEXT,
    canonical_base TEXT NOT NULL,
    google_analytics_id TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ad_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    adsense_publisher_id TEXT NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    slot_header TEXT,
    slot_article_top TEXT,
    slot_article_middle TEXT,
    slot_article_bottom TEXT,
    slot_sidebar TEXT,
    slot_footer TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 14. SYNC LOGS & AUDIT LOGS
-- ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    operation TEXT NOT NULL, -- e.g. 'MODELS_SYNC', 'PRICING_SYNC'
    status sync_status_enum NOT NULL,
    models_processed INT NOT NULL DEFAULT 0,
    models_added INT NOT NULL DEFAULT 0,
    models_updated INT NOT NULL DEFAULT 0,
    possibly_missing INT NOT NULL DEFAULT 0,
    errors TEXT,
    duration_ms INT NOT NULL DEFAULT 0,
    source TEXT NOT NULL,
    triggered_by TEXT NOT NULL DEFAULT 'SYSTEM',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL, -- e.g. 'UPDATE_PRICE', 'EDIT_CAPABILITY', 'CHANGE_STATUS'
    entity TEXT NOT NULL, -- e.g. 'models', 'model_prices', 'articles'
    entity_id TEXT NOT NULL,
    before_state JSONB,
    after_state JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------
-- 15. INDEXES FOR PERFORMANCE & FULL-TEXT SEARCH
-- ------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_models_slug ON models(slug);
CREATE INDEX IF NOT EXISTS idx_models_model_id ON models(model_id);
CREATE INDEX IF NOT EXISTS idx_models_status ON models(status);
CREATE INDEX IF NOT EXISTS idx_models_category ON models(category_id);
CREATE INDEX IF NOT EXISTS idx_models_search ON models USING gin(to_tsvector('indonesian', coalesce(name, '') || ' ' || coalesce(model_id, '') || ' ' || coalesce(description, '')));

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING gin(to_tsvector('indonesian', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, '')));

CREATE INDEX IF NOT EXISTS idx_prices_model ON model_prices(model_id, is_current);
CREATE INDEX IF NOT EXISTS idx_sources_model ON model_sources(model_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sync_created ON sync_logs(created_at DESC);

-- ------------------------------------------------------------------------
-- 16. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparison_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check role of current authenticated user
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS user_role_enum AS $$
DECLARE
    u_role user_role_enum;
BEGIN
    SELECT role INTO u_role FROM profiles WHERE id = auth.uid();
    RETURN coalesce(u_role, 'VIEWER'::user_role_enum);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public Read Policies
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read models" ON models FOR SELECT USING (is_public = true);
CREATE POLICY "Public read capabilities" ON model_capabilities FOR SELECT USING (true);
CREATE POLICY "Public read prices" ON model_prices FOR SELECT USING (true);
CREATE POLICY "Public read status history" ON model_status_history FOR SELECT USING (true);
CREATE POLICY "Public read sources" ON model_sources FOR SELECT USING (true);
CREATE POLICY "Public read article categories" ON article_categories FOR SELECT USING (true);
CREATE POLICY "Public read published articles" ON articles FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Public read comparisons" ON comparisons FOR SELECT USING (true);
CREATE POLICY "Public read comparison items" ON comparison_items FOR SELECT USING (true);
CREATE POLICY "Public read published faqs" ON faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);
CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read seo settings" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "Public read ad settings" ON ad_settings FOR SELECT USING (true);

-- Admin / Editor Policies
CREATE POLICY "Admin/Editor read all models" ON models FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin/Editor write models" ON models FOR ALL TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR'));
CREATE POLICY "Admin/Editor write capabilities" ON model_capabilities FOR ALL TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR'));
CREATE POLICY "Admin/Editor write prices" ON model_prices FOR ALL TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR'));
CREATE POLICY "Admin/Editor write sources" ON model_sources FOR ALL TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR'));
CREATE POLICY "Admin/Editor write status history" ON model_status_history FOR ALL TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR'));
CREATE POLICY "Admin/Editor write articles" ON articles FOR ALL TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR'));
CREATE POLICY "Admin/Editor write comparisons" ON comparisons FOR ALL TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR'));
CREATE POLICY "Admin/Editor write faqs" ON faqs FOR ALL TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR'));
CREATE POLICY "Admin/Editor write settings" ON site_settings FOR ALL TO authenticated USING (get_current_user_role() = 'ADMIN');
CREATE POLICY "Admin/Editor write seo" ON seo_settings FOR ALL TO authenticated USING (get_current_user_role() = 'ADMIN');
CREATE POLICY "Admin/Editor write ads" ON ad_settings FOR ALL TO authenticated USING (get_current_user_role() = 'ADMIN');

-- Sync Logs and Audit Logs: Admin Read and Insert
CREATE POLICY "Admin read sync logs" ON sync_logs FOR SELECT TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR', 'VIEWER'));
CREATE POLICY "Admin insert sync logs" ON sync_logs FOR INSERT TO authenticated WITH CHECK (get_current_user_role() IN ('ADMIN', 'EDITOR'));
CREATE POLICY "Admin read audit logs" ON audit_logs FOR SELECT TO authenticated USING (get_current_user_role() IN ('ADMIN', 'EDITOR', 'VIEWER'));
CREATE POLICY "Admin insert audit logs" ON audit_logs FOR INSERT TO authenticated WITH CHECK (true);
