# OpenAI Models Compare V2 ⚡

> **"Bandingkan Semua Model OpenAI dengan Mudah."**  
> Ensiklopedia, portal komparasi independen, dan kalkulator biaya API resmi terlengkap untuk seluruh model kecerdasan buatan OpenAI.

---

## 🚀 Ikhtisar Proyek (Project Overview)

**OpenAI Models Compare V2** adalah evolusi arsitektur dari versi V1 statis menjadi platform berbasis database dinamis, dilengkapi dengan Content Management System (CMS), autentikasi administrator berbasis peran (RBAC), mesin komparasi multi-model fleksibel (2 atau 3 model), kalkulator biaya token presisi berstandar OpenAI, mesin pencarian model deterministik, serta sistem sinkronisasi otomatis (*auto-sync*) langsung ke endpoint OpenAI Models API dan tabel tarif resmi.

Platform ini 100% independen, dirancang dengan mengedepankan integritas data, transparansi teknis, tanpa data benchmark/tarif palsu, serta sepenuhnya siap monetisasi Google AdSense.

---

## 🛠️ Stack Teknologi (Tech Stack)

* **Frontend Framework:** Next.js 16 (App Router, Turbopack, React Server Components & Client Components)
* **UI Library & Styling:** React 19, Tailwind CSS v4, Lucide React Icons
* **Database & BaaS:** Supabase (PostgreSQL 15+)
* **Authentication:** Supabase Auth (Email & Password, Session management)
* **Authorization:** PostgreSQL Row Level Security (RLS) & Role-Based Access Control (`ADMIN`, `EDITOR`, `VIEWER`)
* **SDK Resmi:** Official OpenAI Node.js SDK (`openai`)
* **Deployment & Edge:** Vercel, Vercel Cron
* **Iklan & Monetisasi:** Google AdSense (Script responsif, file validasi `ads.txt`, ad slots dinamis)

---

## 🏛️ Arsitektur Sistem (System Architecture)

```
                       OPENAI OFFICIAL
                              |
                 +------------+------------+
                 |                         |
         /v1/models (API)          /api/pricing (Docs)
                 |                         |
                 v                         v
       [ Model Sync Service ]    [ Pricing Sync Service ]
                 \                         /
                  \                       /
                   v                     v
              +-----------------------------+
              |     SUPABASE POSTGRESQL     |
              |   (Tables, Enums, RLS)      |
              +-----------------------------+
                             |
             +---------------+---------------+
             |                               |
             v                               v
     [ PUBLIC PORTAL ]               [ ADMIN CONSOLE ]
  /models, /compare, /calculator     /admin (Dashboard)
  /find-model, /categories, /articles  /admin/models (CRUD)
  /history, /deprecated, /disclaimer   /admin/sync, /admin/pricing
             |                               |
             +---------------+---------------+
                             |
                             v
                    VERCEL PRODUCTION
                  (Edge CDN + Vercel Cron)
```

---

## 🗄️ Skema Database (Supabase PostgreSQL)

Migration file SQL tersimpan di `/supabase/migrations/`:
1. `20261006_000001_initial_schema.sql` (Tabel, relasi foreign keys, enums, indeks, dan RLS)
2. `20261006_000002_seed_data.sql` (Seed data lengkap 27 model resmi, 10 kategori, 10 artikel, perbandingan, FAQ, dan pengaturan)

### Daftar Tabel Utama:
* **`profiles`**: Profil pengguna terikat ke `auth.users`, memuat role (`ADMIN`, `EDITOR`, `VIEWER`).
* **`models`**: Katalog model (Display Name terpisah dari API Model ID, context window, status enum, modalities, cutoff).
* **`model_capabilities`**: Matriks 3-kondisi (`SUPPORTED`, `NOT_SUPPORTED`, `UNKNOWN`) untuk visi, reasoning, audio, tools, dsb.
* **`model_prices`**: Tabel tarif historis berbasis periode (`effective_from`, `effective_until`, `is_current`, input/cached/output/batch).
* **`model_status_history`**: Rekam jejak transisi status model (`ACTIVE`, `PREVIEW`, `DEPRECATED`, `RETIRED`).
* **`model_sources`**: Referensi rujukan data (`OFFICIAL_DOCS`, `OFFICIAL_API`, `OFFICIAL_PRICING`, `OFFICIAL_DEPRECATION`).
* **`categories`**: Klasifikasi spesialisasi model (`flagship`, `reasoning`, `coding`, `image`, `audio`, dll).
* **`articles`** & **`article_categories`**: Konten edukasi CMS, tag, metadata SEO, dan relasi model terkait.
* **`comparisons`** & **`comparison_items`**: Preset perbandingan head-to-head multi-model.
* **`faqs`**: FAQ resmi terstruktur dengan urutan tampilan.
* **`site_settings`**, **`seo_settings`**, **`ad_settings`**: Konfigurasi global dinamis.
* **`sync_logs`**: Catatan riwayat audit sinkronisasi API OpenAI.
* **`audit_logs`**: Catatan keamanan setiap modifikasi data oleh admin (before/after state).

---

## 🔒 Keamanan & Hak Akses (RLS & Roles)

1. **Role ADMIN:**
   * Akses tak terbatas ke seluruh modul: Model CRUD, Pricing, Sync API, Settings, SEO, AdSense, dan Audit Logs.
2. **Role EDITOR:**
   * Akses penyuntingan konten artikel, FAQ, dan spesifikasi model.
3. **Role VIEWER:**
   * Read-only ke modul admin tanpa izin modifikasi.
4. **Pengunjung Publik:**
   * Hanya diizinkan membaca data dengan status `is_public = true` dan artikel `status = 'PUBLISHED'`.
5. **Kunci Rahasia (Server-Only Secrets):**
   * `OPENAI_API_KEY` dan `CRON_SECRET` dieksekusi 100% di sisi server (`src/lib/sync/` dan Route Handlers) dan tidak pernah terpapar ke bundel JavaScript browser.

---

## 🔄 Sistem Sinkronisasi OpenAI (Auto-Sync Service)

### 1. Sinkronisasi Model (`/admin/sync` atau `/api/sync/models`)
* Menghubungi endpoint resmi OpenAI Models API (`/v1/models`).
* Mencocokkan model berdasarkan API Model ID resmi.
* Model baru otomatis dibuat dengan metadata resmi.
* **Aturan Anti Auto-Delete (Rule #17):** Jika suatu model tidak lagi muncul di endpoint, sistem **TIDAK** menghapusnya dari database, melainkan menandainya sebagai `possibly_missing` agar admin dapat meninjau dan menjaga arsip histori.

### 2. Verifikasi Tarif (`/admin/pricing` atau `/api/sync/pricing`)
* Sesuai ketentuan teknis, endpoint `/models` tidak menyediakan data harga. Oleh karena itu, sinkronisasi harga dikelola secara terpisah melalui tabel referensi resmi OpenAI Pricing.
* Sistem membuat periode harga baru (`effective_from = NOW()`) dan mengarsipkan harga lama (`is_current = false`) sehingga riwayat fluktuasi biaya tetap tersimpan.

### 3. Vercel Cron (`/api/cron/sync`)
* Dikonfigurasi di `vercel.json` untuk berjalan otomatis setiap hari pada pukul 02:00 UTC.
* Dilindungi oleh token rahasia `CRON_SECRET` pada header Authorization.

---

## 🧮 Mesin Komparasi & Kalkulator Biaya

### 1. Comparison Engine Multi-Model (`/compare` & `/compare/[slug]`)
* Mendukung perbandingan fleksibel **2 atau 3 model** secara berdampingan.
* URL slug otomatis dan stabil: `/compare/gpt-4o-vs-o3-mini` atau `/compare/gpt-6-astra-vs-gpt-6-1-sol-vs-gpt-6-luna`.
* Sorotan highlight dinamis: *Context Window Terbesar*, *Tarif Input Termurah*, *Tarif Output Termurah*.
* Matriks tabel lengkap responsif dengan *horizontal scroll* pada perangkat mobile.

### 2. Deterministic Model Finder (`/find-model`)
* Pencarian model deterministik berdasarkan kebutuhan: Coding, Reasoning, Writing, Image, Audio, Realtime, Embeddings, Moderasi, Hemat Biaya, Konteks Panjang, atau Multimodal.
* Tidak menggunakan tebakan AI palsu, 100% disaring berdasarkan parameter teknis nyata.

### 3. Token Cost Calculator (`/calculator`)
* Formula baku resmi:
  $$\text{Total} = \left(\frac{\text{Input}}{1.000.000} \times P_{\text{in}}\right) + \left(\frac{\text{Cached}}{1.000.000} \times P_{\text{cached}}\right) + \left(\frac{\text{Output}}{1.000.000} \times P_{\text{out}}\right)$$
* Tombol Preset Token: **1K, 10K, 100K, 1M, 10M, 100M**.
* Dukungan diskon **Batch API (50%)** dan **Prompt Caching**.
* Mode **Compare Cost**: Menghitung dan membandingkan selisih persentase biaya 3 model sekaligus.
* Jika model belum memiliki tarif resmi, ditampilkan label transparan: *"Pricing belum tersedia."*

---

## ⚙️ Variabel Lingkungan (Environment Variables)

Salin `.env.example` ke `.env.local`:

```bash
# Public Domain URL
NEXT_PUBLIC_SITE_URL=https://openai-models-compare.vercel.app

# Supabase Credentials (Dapatkan dari Dashboard Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-server-only

# OpenAI Official API Key (Hanya di Server)
OPENAI_API_KEY=sk-proj-your-api-key

# Vercel Cron Protection Secret
CRON_SECRET=your-random-secret-token

# Google AdSense Publisher ID
NEXT_PUBLIC_ADSENSE_ID=ca-pub-5683117405667471

# Google Analytics 4 (Opsional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 💻 Panduan Menjalankan Secara Lokal (Local Development)

```bash
# 1. Masuk ke folder proyek
cd openai-models-compare

# 2. Pasang dependensi
npm install

# 3. Jalankan linter dan tes build
npm run lint
npm run build

# 4. Jalankan server pengembangan
npm run dev
```

Buka peramban di `http://localhost:3000`.  
Admin console dapat diakses di `http://localhost:3000/admin`.

---

## 🚀 Panduan Deployment ke Vercel

1. **Push kode ke GitHub:**
   ```bash
   git add .
   git commit -m "feat: upgrade to OpenAI Models Compare V2 complete"
   git push origin main
   ```
2. **Deploy via Vercel CLI:**
   ```bash
   vercel --prod
   ```
3. **Konfigurasi Environment Variables di Vercel Dashboard:**
   * Buka Settings &rarr; Environment Variables.
   * Masukkan `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `OPENAI_API_KEY`, dan `CRON_SECRET`.
4. **Jalankan Migrasi Supabase:**
   * Buka SQL Editor di Dashboard Supabase Anda.
   * Salin dan jalankan isi file `supabase/migrations/20261006_000001_initial_schema.sql`.
   * Salin dan jalankan isi file `supabase/migrations/20261006_000002_seed_data.sql`.

---

## 📝 Kebijakan Integritas & Transparansi Data

* **Tidak Ada Data Palsu:** Platform ini tidak menampilkan ulasan buatan, angka pengunjung palsu, atau tolok ukur benchmark rekayasa.
* **Sumber Resmi:** Setiap halaman model menyertakan rujukan URL ke dokumentasi resmi OpenAI (`platform.openai.com/docs`).
* **Disclaimer:** Tersedia di `/disclaimer` bahwa situs ini independen dan bukan bagian dari OpenAI.
