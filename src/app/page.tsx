import Link from 'next/link';
import { getAllModels, getAllArticles, getCategories, getFaqs } from '@/lib/db';
import ModelCard from '@/components/ModelCard';
import ModelSelector from '@/components/ModelSelector';
import ComparisonView from '@/components/ComparisonView';
import TokenCalculator from '@/components/TokenCalculator';
import AdBanner from '@/components/AdBanner';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Scale, 
  CheckCircle2, 
  HelpCircle, 
  Compass,
  Cpu
} from 'lucide-react';

export default async function HomePage() {
  const [allModels, allArticles, categories, faqs] = await Promise.all([
    getAllModels(),
    getAllArticles(),
    getCategories(),
    getFaqs()
  ]);
  
  // Featured active models
  const featuredModels = allModels.filter(m => 
    ['gpt-4o', 'o3-mini', 'gpt-4o-mini', 'o1', 'dall-e-3', 'whisper-1'].includes(m.id)
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-6 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Basis Data Resmi OpenAI Developers 2025/2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Bandingkan Semua Model OpenAI
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4 sm:mt-6 leading-relaxed font-normal">
          Temukan perbedaan model OpenAI berdasarkan kemampuan, harga, kecepatan, context window, reasoning, coding, image, audio, dan kebutuhan penggunaan.
        </p>

        {/* Search Box */}
        <div className="mt-8 max-w-xl mx-auto">
          <form action="/models" method="GET" className="relative group">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              name="search"
              placeholder="Cari model... (mis. GPT-6 Luna, o3-mini, gpt-4o)"
              className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 shadow-lg shadow-black/5 dark:shadow-black/20 focus:outline-none focus:border-emerald-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow transition-colors"
            >
              Cari Model
            </button>
          </form>
        </div>

        {/* Action Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
          <Link
            href="/find-model"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
          >
            <Compass className="w-4 h-4" />
            <span>Gunakan Model Finder Deterministik &rarr;</span>
          </Link>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-[#161f30] text-slate-700 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all"
          >
            <span>Kalkulator Token Biaya API</span>
          </Link>
        </div>

        {/* Quick Stats Banner */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">100% Sumber OpenAI Resmi</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Model Teks, Visi, Audio & Gambar</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Daftar Lengkap Model Deprecated</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Kalkulator Token Terintegrasi</span>
          </div>
        </div>
      </section>

      {/* TOP ADVERTISEMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner slot="top" />
      </div>

      {/* 2. QUICK CATEGORY */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-wider text-emerald-500 font-bold block mb-1">
            Navigasi Kategori
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Jelajahi Berdasarkan Kebutuhan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pilih spesialisasi model untuk melihat kemampuan dan perbandingannya.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/models?category=${cat.id}`}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl sm:text-3xl block mb-2">{cat.icon}</span>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {cat.name}
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 mt-2 line-clamp-1 block">
                {cat.tagline}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED MODELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-500 font-bold block mb-1">
              Sorotan Utama
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Model Aktif Paling Relevan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Rangkaian model resmi OpenAI yang paling sering digunakan untuk implementasi produksi saat ini.
            </p>
          </div>
          <Link
            href="/models"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Buka Semua Model ({allModels.length}) &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredModels.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </section>

      {/* BETWEEN CONTENT ADVERTISEMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner slot="between-content" />
      </div>

      {/* 4. INTERACTIVE MODEL SELECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ModelSelector models={allModels} />
      </section>

      {/* 5. INTERACTIVE HEAD-TO-HEAD COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-wider text-emerald-500 font-bold block mb-1">
            Matriks Komparasi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Perbandingan Berdampingan (Head-to-Head)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Pilih hingga 3 model untuk membandingkan spesifikasi teknis, harga token, dan rekomendasi penggunaannya.
          </p>
        </div>

        <ComparisonView allModels={allModels} />
      </section>

      {/* 6. TOKEN COST CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TokenCalculator models={allModels} />
      </section>

      {/* 7. FEATURED ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-500 font-bold block mb-1">
              Ensiklopedia & Wawasan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Panduan & Analisis Mendalam
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Artikel komprehensif untuk memahami konsep arsitektur AI, token, dan tolok ukur.
            </p>
          </div>
          <Link
            href="/articles"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Semua Artikel ({allArticles.length}) &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {allArticles.slice(0, 4).map((art) => (
            <Link
              key={art.slug}
              href={`/articles/${art.slug}`}
              className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-2 block">
                  {art.category}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug mb-2">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{art.publishedAt}</span>
                <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                  Baca &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-wider text-emerald-500 font-bold block mb-1">
            FAQ Resmi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Informasi penting seputar model OpenAI berdasarkan dokumentasi resmi.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2"
            >
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM ADVERTISEMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner slot="bottom" />
      </div>
    </div>
  );
}
