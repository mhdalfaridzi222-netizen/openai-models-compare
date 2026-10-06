import fs from 'fs';
import path from 'path';

const dump = JSON.parse(fs.readFileSync(path.join(__dirname, 'v1_dump.json'), 'utf-8'));

function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function escapeArr(arr: string[] | null | undefined): string {
  if (!arr || arr.length === 0) return 'ARRAY[]::TEXT[]';
  const items = arr.map(x => `'${String(x).replace(/'/g, "''")}'`);
  return `ARRAY[${items.join(', ')}]::TEXT[]`;
}

function toCap(val: boolean | undefined): string {
  if (val === true) return "'SUPPORTED'";
  if (val === false) return "'NOT_SUPPORTED'";
  return "'UNKNOWN'";
}

const lines: string[] = [];

lines.push('-- ========================================================================');
lines.push('-- OPENAI MODELS COMPARE V2 - DATABASE SEED DATA');
lines.push('-- Migration: 20261006_000002_seed_data.sql');
lines.push('-- ========================================================================');
lines.push('');

// 1. Categories
lines.push('-- 1. CATEGORIES');
for (const cat of dump.categories) {
  lines.push(`INSERT INTO categories (id, name, slug, icon, tagline, description, badge_color) VALUES (` +
    `${escapeSql(cat.id)}, ${escapeSql(cat.name)}, ${escapeSql(cat.slug)}, ${escapeSql(cat.icon)}, ${escapeSql(cat.tagline)}, ${escapeSql(cat.description)}, ${escapeSql(cat.badgeColor)}` +
    `) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;`);
}
lines.push('');

// 2. Article Categories
lines.push('-- 2. ARTICLE CATEGORIES');
const artCats = [
  { id: 'panduan-dasar', name: 'Panduan Dasar', slug: 'panduan-dasar', description: 'Panduan fundamental mengenai model AI OpenAI' },
  { id: 'arsitektur', name: 'Arsitektur Masa Depan', slug: 'arsitektur', description: 'Analisis arsitektur model dan inovasi AI terbaru' },
  { id: 'coding-developer', name: 'Developer & Coding', slug: 'coding-developer', description: 'Panduan rekayasa perangkat lunak dan SWE-bench' },
  { id: 'kreatif-visual', name: 'Kreatif & Visual', slug: 'kreatif-visual', description: 'Generasi seni visual dan pemrosesan gambar' },
  { id: 'audio-voice', name: 'Audio & Voice', slug: 'audio-voice', description: 'Pemrosesan suara alami dan WebSocket realtime' },
  { id: 'teknis-arsitektur', name: 'Teknis & Arsitektur', slug: 'teknis-arsitektur', description: 'Konsep context window, tokenisasi, dan optimasi' },
  { id: 'tata-kelola', name: 'Tata Kelola API', slug: 'tata-kelola', description: 'Siklus hidup model, deprecation, dan migrasi' },
  { id: 'penalaran-deep', name: 'Penalaran & Deep Thinking', slug: 'penalaran-deep', description: 'Chain-of-thought dan tolok ukur penalaran' },
  { id: 'finansial-biaya', name: 'Finansial & Biaya Token', slug: 'finansial-biaya', description: 'Perhitungan kalkulator token dan estimasi tagihan API' }
];

for (const ac of artCats) {
  lines.push(`INSERT INTO article_categories (id, name, slug, description) VALUES (` +
    `${escapeSql(ac.id)}, ${escapeSql(ac.name)}, ${escapeSql(ac.slug)}, ${escapeSql(ac.description)}` +
    `) ON CONFLICT (id) DO NOTHING;`);
}
lines.push('');

// 3. Models, Capabilities, Prices, Sources
lines.push('-- 3. MODELS, CAPABILITIES, PRICES, SOURCES');
for (const m of dump.models) {
  const inputMods = ['text'];
  if (m.imageInput) inputMods.push('image');
  if (m.audioInput) inputMods.push('audio');

  const outputMods = ['text'];
  if (m.imageGeneration) outputMods.push('image');
  if (m.audioOutput) outputMods.push('audio');

  lines.push(`INSERT INTO models (` +
    `id, name, slug, model_id, family, category_id, short_description, description, ` +
    `status, release_date, knowledge_cutoff, context_window, max_output_tokens, ` +
    `input_modalities, output_modalities, official_url, documentation_url, ` +
    `suitable_for, not_suitable_for, recommended_replacement, deprecated_date, shutdown_date, ` +
    `is_featured, is_public, last_verified_at` +
    `) VALUES (` +
    `${escapeSql(m.id)}, ${escapeSql(m.name)}, ${escapeSql(m.slug)}, ${escapeSql(m.modelId)}, ${escapeSql(m.family)}, ` +
    `${escapeSql(m.category)}, ${escapeSql(m.shortDescription)}, ${escapeSql(m.description)}, ` +
    `'${m.status}', ${escapeSql(m.releaseDate)}, ${escapeSql(m.knowledgeCutoff)}, ` +
    `${m.contextWindow !== null ? m.contextWindow : 'NULL'}, ${m.maxOutputTokens !== null ? m.maxOutputTokens : 'NULL'}, ` +
    `${escapeArr(inputMods)}, ${escapeArr(outputMods)}, ${escapeSql(m.officialUrl)}, ${escapeSql(m.officialUrl)}, ` +
    `${escapeArr(m.suitableFor)}, ${escapeArr(m.notSuitableFor)}, ${escapeSql(m.recommendedReplacement)}, ` +
    `${escapeSql(m.deprecatedDate)}, ${escapeSql(m.shutdownDate)}, ` +
    `${['gpt-4o', 'o3-mini', 'o1', 'gpt-4o-mini'].includes(m.id) ? 'TRUE' : 'FALSE'}, TRUE, NOW()` +
    `) ON CONFLICT (id) DO UPDATE SET ` +
    `name = EXCLUDED.name, description = EXCLUDED.description, status = EXCLUDED.status, updated_at = NOW();`);

  // Capabilities
  lines.push(`INSERT INTO model_capabilities (` +
    `model_id, text_input, text_output, image_input, image_output, audio_input, audio_output, ` +
    `reasoning, vision, function_calling, structured_outputs, streaming, web_search, file_search, ` +
    `computer_use, realtime, embeddings, moderation, source_url, verified_at` +
    `) VALUES (` +
    `${escapeSql(m.id)}, ` +
    `'SUPPORTED', 'SUPPORTED', ` +
    `${toCap(m.imageInput)}, ${toCap(m.imageGeneration)}, ${toCap(m.audioInput)}, ${toCap(m.audioOutput)}, ` +
    `${toCap(m.reasoning)}, ${toCap(m.vision)}, ${toCap(m.functionCalling)}, ${toCap(m.structuredOutputs)}, ` +
    `'SUPPORTED', ${toCap(m.webSearch)}, ${toCap(m.fileSearch)}, ${toCap(m.computerUse)}, ` +
    `${toCap(m.category === 'realtime')}, ${toCap(m.category === 'embeddings')}, ${toCap(m.category === 'moderation')}, ` +
    `${escapeSql(m.officialUrl)}, NOW()` +
    `) ON CONFLICT (model_id) DO UPDATE SET verified_at = NOW();`);

  // Price (if any)
  if (m.inputPrice !== null || m.outputPrice !== null) {
    lines.push(`INSERT INTO model_prices (` +
      `model_id, input_price_per_1m, cached_input_price_per_1m, output_price_per_1m, ` +
      `batch_input_price_per_1m, batch_output_price_per_1m, currency, effective_from, is_current, source_url, verified_at` +
      `) VALUES (` +
      `${escapeSql(m.id)}, ` +
      `${m.inputPrice !== null ? m.inputPrice : 'NULL'}, ` +
      `${m.cachedInputPrice !== null ? m.cachedInputPrice : 'NULL'}, ` +
      `${m.outputPrice !== null ? m.outputPrice : 'NULL'}, ` +
      `${m.inputPrice !== null ? (m.inputPrice * 0.5).toFixed(4) : 'NULL'}, ` +
      `${m.outputPrice !== null ? (m.outputPrice * 0.5).toFixed(4) : 'NULL'}, ` +
      `'USD', '2024-01-01 00:00:00+00', TRUE, ${escapeSql(m.officialUrl)}, NOW()` +
      `);`);
  }

  // Source
  lines.push(`INSERT INTO model_sources (` +
    `model_id, source_type, source_url, source_title, checked_at` +
    `) VALUES (` +
    `${escapeSql(m.id)}, 'OFFICIAL_DOCS', ${escapeSql(m.officialUrl)}, ` +
    `'Dokumentasi Resmi OpenAI: ' || ${escapeSql(m.name)}, NOW()` +
    `);`);
}
lines.push('');

// 4. Articles
lines.push('-- 4. ARTICLES');
for (const art of dump.articles) {
  lines.push(`INSERT INTO articles (` +
    `title, slug, excerpt, content, category_id, tags, author, seo_title, seo_description, canonical_url, status, published_at` +
    `) VALUES (` +
    `${escapeSql(art.title)}, ${escapeSql(art.slug)}, ${escapeSql(art.excerpt)}, ${escapeSql(art.content)}, ` +
    `'panduan-dasar', ${escapeArr(art.tags)}, ${escapeSql(art.author)}, ${escapeSql(art.seoTitle)}, ` +
    `${escapeSql(art.seoDescription)}, ${escapeSql(art.canonicalUrl)}, 'PUBLISHED', NOW()` +
    `) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, excerpt = EXCLUDED.excerpt;`);
}

// Add the remaining 2 articles for the full 10
const extraArticle1 = {
  title: 'Cara Memilih Model OpenAI Sesuai Kebutuhan Aplikasi & Bisnis Anda',
  slug: 'cara-memilih-model-openai-sesuai-kebutuhan',
  excerpt: 'Panduan praktis langkah-demi-langkah memilih model OpenAI terbaik berdasarkan kompromi kecerdasan, kecepatan inferensi, modalitas, dan efisiensi anggaran API.',
  content: `### Mengapa Pemilihan Model yang Tepat Sangat Krusial?

Dengan berkembangnya katalog model OpenAI dari seri GPT-4o, keluarga penalaran o-series (o1 dan o3-mini), hingga model spesialis embeddings dan multimodal, memilih model bukan lagi sekadar mencari "model nomor satu". Setiap model memiliki trade-off yang nyata antara biaya, latensi, dan kemampuan kognitif.

---

### Kerangka 4 Pertanyaan untuk Menentukan Pilihan:

1. **Apakah tugas membutuhkan penalaran multi-langkah (STEM, coding mendalam, pembuktian matematika)?**
   - **Ya:** Pilih **o3-mini** untuk kecepatan dan efisiensi tinggi, atau **o1** untuk masalah visual dan STEM tingkat doktoral.
   - **Tidak:** Lanjut ke pertanyaan berikutnya.

2. **Apakah aplikasi memerlukan interaksi teks dan gambar multimodal serbaguna?**
   - Gunakan **GPT-4o** untuk pemahaman visual detail dan respon natural tingkat enterprise.
   - Gunakan **GPT-4o mini** jika volume panggilan sangat tinggi dan anggaran menjadi prioritas utama.

3. **Apakah Anda membangun pencarian semantik (RAG)?**
   - Gunakan **text-embedding-3-small** untuk katalog dokumen umum dengan biaya ultra-murah ($0.02 / 1M token).
   - Gunakan **text-embedding-3-large** jika akurasi pencarian kemiripan dokumen sangat kritis.

4. **Apakah Anda memerlukan interaksi audio dua arah real-time?**
   - Gunakan **gpt-4o-realtime-preview** melalui antarmuka WebSocket audio-ke-audio langsung.

---

### Matriks Rekomendasi Berdasarkan Use Case

| Kebutuhan Aplikasi | Model yang Direkomendasikan | Alasan Utama |
|---|---|---|
| Customer Support Bot | **GPT-4o mini** | Kecepatan kilat, murah, kapasitas konteks 128k token |
| Code Review & Refactoring | **o3-mini** | Unggul dalam penalaran syntax, skor SWE-bench tinggi |
| Ekstraksi Faktur & Gambar | **GPT-4o** | Multimodal native, akurasi OCR dan penalaran spasial tinggi |
| Transkripsi Suara Rapat | **whisper-1** | Multibahasa akurat dan toleran terhadap background noise |`,
  seoTitle: 'Cara Memilih Model OpenAI Sesuai Kebutuhan Aplikasi & Bisnis Anda',
  seoDescription: 'Panduan praktis memilih model OpenAI terbaik: perbandingan kebutuhan chatbot, coding o3-mini, analisis dokumen GPT-4o, dan efisiensi biaya API.',
  tags: ['Panduan', 'Pemilihan Model', 'OpenAI API', 'o3-mini', 'GPT-4o']
};

const extraArticle2 = {
  title: 'Cara Menghitung Biaya OpenAI API: Panduan Lengkap dan Kalkulator Token',
  slug: 'cara-menghitung-biaya-openai-api-panduan-kalkulator',
  excerpt: 'Pelajari rumus baku perhitungan tarif input token, output token, prompt caching diskon 50%, dan Batch API untuk menghemat anggaran operasional AI hingga 80%.',
  content: `### Rumus Baku Perhitungan Biaya OpenAI API

OpenAI menagih penggunaan API berdasarkan jumlah **token** yang diproses, bukan berdasarkan jumlah kata atau waktu koneksi server.

Secara matematis, formula total biaya per permintaan dihitung sebagai berikut:

$$\\text{Total Biaya} = \\left(\\frac{\\text{Input Token}}{1.000.000} \\times \\text{Harga Input}\\right) + \\left(\\frac{\\text{Cached Input Token}}{1.000.000} \\times \\text{Harga Cached Input}\\right) + \\left(\\frac{\\text{Output Token}}{1.000.000} \\times \\text{Harga Output}\\right)$$

---

### Strategi Menghemat Biaya Hingga 80%

1. **Manfaatkan Prompt Caching Otomatis:**
   Untuk prompt yang panjangnya di atas 1.024 token dan sering digunakan berulang kali (misalnya system instructions atau dokumen referensi), OpenAI memberikan potongan harga 50% secara otomatis pada bagian prompt yang terkena cache.

2. **Gunakan Batch API untuk Pekerjaan Non-Realtime:**
   Jika tugas Anda dapat diselesaikan dalam kurun waktu 24 jam (misalnya ekstraksi data malam hari, klasifikasi konten harian), Batch API memberikan diskon langsung **50% untuk input dan output**.

3. **Gunakan Model Hirarkis (Model Routing):**
   Gunakan **GPT-4o mini** untuk menyortir intent dan menjawab pertanyaan mudah, lalu teruskan pertanyaan matematika atau coding yang rumit ke **o3-mini** atau **o1**.`,
  seoTitle: 'Cara Menghitung Biaya OpenAI API: Panduan Lengkap dan Kalkulator Token',
  seoDescription: 'Pelajari rumus baku perhitungan tarif token OpenAI, diskon prompt caching, Batch API, dan simulasi biaya per bulan menggunakan kalkulator resmi.',
  tags: ['Biaya API', 'Kalkulator Token', 'Pricing OpenAI', 'Hemat Biaya']
};

for (const art of [extraArticle1, extraArticle2]) {
  lines.push(`INSERT INTO articles (` +
    `title, slug, excerpt, content, category_id, tags, author, seo_title, seo_description, canonical_url, status, published_at` +
    `) VALUES (` +
    `${escapeSql(art.title)}, ${escapeSql(art.slug)}, ${escapeSql(art.excerpt)}, ${escapeSql(art.content)}, ` +
    `'panduan-dasar', ${escapeArr(art.tags)}, 'OpenAI Models Compare Research Team', ${escapeSql(art.seoTitle)}, ` +
    `${escapeSql(art.seoDescription)}, 'https://openai-models-compare.vercel.app/articles/' || ${escapeSql(art.slug)}, 'PUBLISHED', NOW()` +
    `) ON CONFLICT (slug) DO NOTHING;`);
}
lines.push('');

// 5. Comparisons
lines.push('-- 5. COMPARISONS');
for (const comp of dump.comparisons) {
  lines.push(`INSERT INTO comparisons (` +
    `id, title, slug, description, highlight, model_ids, is_featured, seo_title, seo_description` +
    `) VALUES (` +
    `${escapeSql(comp.id)}, ${escapeSql(comp.title)}, ${escapeSql(comp.slug)}, ${escapeSql(comp.description)}, ` +
    `${escapeSql(comp.highlight)}, ${escapeArr(comp.modelIds)}, TRUE, ` +
    `'Perbandingan ' || ${escapeSql(comp.title)}, ${escapeSql(comp.description)}` +
    `) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, highlight = EXCLUDED.highlight;`);
}
lines.push('');

// 6. FAQs
lines.push('-- 6. FAQS');
for (let i = 0; i < dump.faqs.length; i++) {
  const f = dump.faqs[i];
  lines.push(`INSERT INTO faqs (question, answer, sort_order, is_published) VALUES (` +
    `${escapeSql(f.q)}, ${escapeSql(f.a)}, ${i + 1}, TRUE` +
    `);`);
}
lines.push('');

// 7. Site Settings, SEO Settings, Ad Settings
lines.push('-- 7. SETTINGS');
lines.push(`INSERT INTO site_settings (key, value, description) VALUES ` +
  `('general', '{"site_name": "OpenAI Models Compare", "tagline": "Bandingkan Model OpenAI dengan Mudah.", "description": "Platform independen untuk memahami, membandingkan, dan menghitung estimasi biaya berbagai model OpenAI.", "contact_email": "admin@alfaridzi.dev"}'::jsonb, 'Konfigurasi umum website') ` +
  `ON CONFLICT (key) DO NOTHING;`);

lines.push(`INSERT INTO seo_settings (id, default_title, default_description, default_og_image, canonical_base, google_analytics_id) VALUES (` +
  `'default', 'OpenAI Models Compare — Bandingkan Semua Model OpenAI dengan Mudah.', ` +
  `'Ensiklopedia & portal komparasi independen terlengkap untuk semua model OpenAI: spesifikasi, kemampuan visi, coding, reasoning, context window, tolok ukur, dan kalkulator biaya API.', ` +
  `'https://openai-models-compare.vercel.app/og.jpg', 'https://openai-models-compare.vercel.app', NULL` +
  `) ON CONFLICT (id) DO NOTHING;`);

lines.push(`INSERT INTO ad_settings (id, adsense_publisher_id, is_enabled, slot_header, slot_article_top, slot_article_middle, slot_article_bottom, slot_sidebar, slot_footer) VALUES (` +
  `'default', 'ca-pub-5683117405667471', TRUE, 'header-top', 'art-top', 'art-mid', 'art-bot', 'sidebar', 'footer'` +
  `) ON CONFLICT (id) DO NOTHING;`);

lines.push('');
lines.push('-- FINISHED SEED DATA');

fs.writeFileSync(
  path.join(__dirname, '../supabase/migrations/20261006_000002_seed_data.sql'),
  lines.join('\n'),
  'utf-8'
);

console.log('Seed migration generated successfully at supabase/migrations/20261006_000002_seed_data.sql');
