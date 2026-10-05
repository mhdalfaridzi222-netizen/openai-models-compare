# OpenAI Models Compare ⚡
> **"Bandingkan Semua Model OpenAI dengan Mudah."**

Portal ensiklopedia, panduan teknis, dan perbandingan interaktif model kecerdasan buatan OpenAI (API, LLM, Vision, Audio, Image, dan Embeddings) berbasis Next.js, React, TypeScript, dan Tailwind CSS.

---

## 🚀 Fitur Utama

1. **Katalog & Direktori Model Komprehensif (`/models`)**
   - Filter multivariat: Kategori (Flagship, Reasoning, Coding, Image, Audio, Realtime, Embeddings, Moderation, Open-weight, Deprecated), Status Siklus Hidup, Kemampuan Vision/Audio/Reasoning, Context Window, dan Rentang Harga.
   - Fitur pencarian instan (Name, API Model ID, Family, dan Deskripsi).
   - Pengurutan dinamis (Terbaru, Terlama, Termurah, Tertinggi, Context Terbesar).

2. **Matriks Perbandingan Berdampingan (Head-to-Head) (`/compare`)**
   - Komparasi hingga 3 model secara simultan dalam tabel teknis terperinci yang responsif dengan *horizontal scroll* pada perangkat seluler.
   - Rekomendasi praktis berbasis use-case ("Model A lebih cocok untuk...", "Model B lebih cocok untuk...").
   - Kemampuan berbagi perbandingan melalui URL parameter (`/compare?a=gpt-4o&b=o3-mini&c=gpt-4o-mini`).

3. **Halaman Detail Spesifikasi Resmi per Model (`/models/[slug]`)**
   - Rincian parameter teknis: API Model ID, Jendela Konteks (*Context Window*), Batas Maksimum Output, Knowledge Cutoff, dan dukungan modalitas.
   - Tabel tarif resmi API per 1M token (Input, Cached Input, Output) dengan konversi rupiah (IDR).
   - Analisis objektif "Cocok untuk" vs "Tidak cocok untuk / Keterbatasan".
   - Tautan langsung ke halaman dokumentasi resmi OpenAI dan tanggal verifikasi data terakhir.

4. **Kalkulator Biaya Token Interaktif (`/calculator`)**
   - Simulasi estimasi pengeluaran bulanan berdasarkan input token, output token, dan volume panggilan harian.
   - Dukungan toggle Prompt Caching (potongan 50% input) dan Batch API (potongan flat 50%).
   - Dilengkapi penafian resmi finansial independen.

5. **Pangkalan Data Historis Model Deprecated & Retired (`/models/deprecated`)**
   - Arsip lengkap model-model lama yang sudah usang (*deprecated*) atau telah dimatikan permanen di server (*shutdown/retired*) beserta rekomendasi model penggantinya.

6. **Garis Waktu Evolusi Model (`/history`)**
   - Timeline interaktif perkembangan teknologi OpenAI dari Transformer era awal (GPT-1, GPT-2), peluncuran ChatGPT & GPT-3.5 Turbo, era GPT-4 & GPT-4o omnimodal, hingga revolusi model penalaran o-series (*test-time compute*).

7. **Pusat Pengetahuan & Panduan Fundamental (`/guides`)**
   - `/guides/tokens` — Penjelasan cara kerja tokenizer, input vs output token, dan prompt caching.
   - `/guides/context-window` — Memahami memori kerja model dan implikasi dokumen panjang.
   - `/guides/api-vs-chatgpt` — Membedakan antara produk langganan konsumen ChatGPT dengan endpoint API terprogram.

8. **Sistem Ensiklopedia & Artikel Teknis (`/articles` & `/articles/[slug]`)**
   - 8 artikel analisis komparasi mendalam dengan metadata SEO lengkap dan integrasi schema JSON-LD.

9. **SEO & Kesiapan Periklanan Google AdSense**
   - Meta tag teroptimasi, Dynamic OpenGraph/Twitter Card, Breadcrumbs, Canonical URLs, Semantic HTML, Sitemap XML, dan Robots.txt.
   - 5 slot penempatan iklan responsif (`top`, `between-content`, `article`, `sidebar`, `bottom`) siap integrasi dengan `NEXT_PUBLIC_ADSENSE_ID`.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library UI:** [React 19](https://react.dev/)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment Platform:** [Vercel](https://vercel.com/)

---

## 📦 Instalasi & Menjalankan Lokal

Pastikan Anda telah menginstal **Node.js (v18.18+ atau v20+)** dan **npm**.

```bash
# 1. Masuk ke direktori project
cd openai-models-compare

# 2. Instal seluruh dependensi
npm install

# 3. Jalankan server pengembangan lokal
npm run dev
```

Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Build & Verifikasi Produksi

```bash
# Jalankan kompilasi TypeScript dan static optimization
npm run build

# Menjalankan server build produksi secara lokal
npm start
```

---

## ☁️ Panduan Deploy ke Vercel

Project ini dirancang *zero-configuration* dan 100% kompatibel dengan arsitektur serverless/edge Vercel:

1. **Push ke GitHub / GitLab:**
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit OpenAI Models Compare V1"
   git remote add origin https://github.com/<username>/openai-models-compare.git
   git push -u origin main
   ```
2. **Impor ke Vercel:**
   - Masuk ke dashboard [vercel.com](https://vercel.com).
   - Klik **"Add New..."** &rarr; **"Project"**.
   - Pilih repositori GitHub `openai-models-compare`.
   - Vercel akan secara otomatis mendeteksi Framework Preset **Next.js**.
3. **Environment Variables (Opsional):**
   - Tambahkan variabel berikut pada menu Environment Variables jika diperlukan:
     - `NEXT_PUBLIC_ADSENSE_ID`: `ca-pub-XXXXXXXXXXXXXXXX` (Publisher ID Google AdSense Anda).
     - `NEXT_PUBLIC_SITE_URL`: `https://domain-anda.vercel.app`
4. **Klik "Deploy"**: Situs Anda akan aktif dalam hitungan detik.

---

## 📝 Cara Mengelola & Memperbarui Data

Struktur data project ini dibuat **terpusat (single source of truth)** agar pengembang dapat memperbarui atau menambah model tanpa menyentuh kode komponen UI:

### 1. Menambah Model Baru
Buka berkas `src/data/models.ts` dan tambahkan objek model baru ke dalam array `MODELS`:

```typescript
{
  id: 'gpt-6-nova',
  name: 'GPT-6 Nova',
  slug: 'gpt-6-nova',
  modelId: 'gpt-6-nova-preview',
  family: 'GPT-6',
  category: 'flagship',
  description: 'Model generasi berikutnya dengan efisiensi penalaran tingkat tinggi.',
  shortDescription: 'Model frontier untuk tugas analitis dan kode kompleks.',
  reasoning: true,
  contextWindow: 1000000,
  maxOutputTokens: 64000,
  inputPrice: 2.00,
  cachedInputPrice: 1.00,
  outputPrice: 8.00,
  knowledgeCutoff: 'Februari 2026',
  imageInput: true,
  imageGeneration: false,
  audioInput: false,
  audioOutput: false,
  vision: true,
  functionCalling: true,
  structuredOutputs: true,
  webSearch: true,
  fileSearch: true,
  computerUse: true,
  status: 'PREVIEW',
  releaseDate: '2026-03-15',
  deprecatedDate: null,
  shutdownDate: null,
  officialUrl: 'https://platform.openai.com/docs/models',
  lastUpdated: 'Maret 2026',
  suitableFor: ['Rekayasa sistem berskala besar', 'Penalaran dokumen raksasa'],
  notSuitableFor: ['Chatbot berbiaya ultra rendah'],
  recommendedReplacement: null,
}
```

Halaman `/models`, `/models/gpt-6-nova`, `/compare`, dan sitemap XML akan secara otomatis mengenali dan merender model baru tersebut.

### 2. Memperbarui Harga Token
Buka `src/data/models.ts`, cari model berdasarkan `modelId`, dan perbarui nilai:
- `inputPrice`: Harga input per 1M token (USD).
- `cachedInputPrice`: Harga input cached per 1M token (USD).
- `outputPrice`: Harga output per 1M token (USD).
- `lastUpdated`: Tanggal verifikasi terbaru (misal: "Oktober 2026").

### 3. Menambah Artikel Baru
Buka `src/data/articles.ts` dan tambahkan entri baru ke dalam array `ARTICLES`. Artikel akan langsung tersedia di `/articles` dan `/articles/[slug]`.

---

## 🔮 Roadmap Pengembangan Masa Depan (V2 - V5)

- [ ] **V2 (Headless CMS & Admin Dashboard):** Migrasi data dari static TypeScript array ke database headless (seperti Supabase atau Prisma PostgreSQL) dengan dashboard manajemen konten.
- [ ] **V3 (Sinkronisasi Otomatis API OpenAI):** Integrasi cron job harian via `/v1/models` untuk mendeteksi penambahan model baru dan perubahan status deprecation secara otomatis.
- [ ] **V4 (Smart AI Model Advisor):** Rekomendasi model cerdas berbasis evaluasi teks masukan pengguna menggunakan LLM ringan.
- [ ] **V5 (Akun Pengguna & Saved Matrix):** Fitur penyimpanan tabel perbandingan khusus pengguna dan alert notifikasi perubahan harga API.

---

## ⚖️ Penafian Independensi (Disclaimer)

*OpenAI Models Compare adalah website informasi independen dan bukan website resmi OpenAI. Nama, logo, dan merek dagang OpenAI merupakan hak milik OpenAI, L.L.C. Seluruh data spesifikasi dan harga dapat berubah sewaktu-waktu oleh penyedia resmi.*
