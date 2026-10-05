import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import AdBanner from '@/components/AdBanner';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Artikel, Panduan & Analisis Mendalam Model OpenAI',
  description: 'Koleksi artikel teknis dan perbandingan model OpenAI: benchmark coding, reasoning o-series, sintesis gambar DALL-E, dan arsitektur token.',
};

export default function ArticlesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Artikel & Ensiklopedia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Wawasan & Panduan Model OpenAI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Kumpulan analisis mendalam yang ditulis secara objektif dan mudah dipahami untuk membantu Anda memilih dan mengoptimalkan implementasi model AI.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((art) => (
          <Link
            key={art.slug}
            href={`/articles/${art.slug}`}
            className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 px-2.5 py-1 rounded-lg bg-emerald-500/10 inline-block">
                {art.category}
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug">
                {art.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{art.publishedAt}</span>
              </div>
              <span className="text-emerald-500 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Baca &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      <AdBanner slot="bottom" />

    </div>
  );
}
