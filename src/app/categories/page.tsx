import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getAllModels } from '@/lib/db';
import AdBanner from '@/components/AdBanner';
import { Layers, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kategori Model OpenAI — Direktori & Klasifikasi Model AI',
  description: 'Jelajahi kategori spesialisasi model OpenAI: Flagship, Reasoning (o-series), Coding, Image, Audio, Realtime Voice, Embeddings, Moderasi, dan Open-Weight.',
};

export default async function CategoriesPage() {
  const [categories, models] = await Promise.all([
    getCategories(),
    getAllModels()
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Navigasi Kategori Resmi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Kategori Spesialisasi Model OpenAI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Pilih klasifikasi model untuk mempelajari arsitektur, perbedaan tolok ukur teknis, dan perbandingan use-case spesifik.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const modelCount = models.filter(m => m.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl block">{cat.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#161f30] text-slate-600 dark:text-slate-300">
                    {modelCount} Model
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {cat.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-emerald-500 transition-colors">
                <span>Lihat Semua Model</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      <AdBanner slot="bottom" />
    </div>
  );
}
