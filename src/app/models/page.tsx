import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllModels } from '@/lib/db';
import ModelsFilterView from '@/components/ModelsFilterView';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Katalog & Filter Lengkap Model OpenAI (API & LLM)',
  description: 'Cari, filter, dan bandingkan seluruh model OpenAI: Flagship, Reasoning (o-series), Coding, Vision, Image (DALL-E), Audio (Whisper/TTS), dan Embeddings.',
};

export default async function ModelsPage() {
  const allModels = await getAllModels();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider text-emerald-500 font-bold block">
          Direktori Lengkap
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Katalog Model OpenAI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Temukan model yang paling tepat berdasarkan kategori, status siklus hidup, kemampuan multimodal, kapasitas context window, dan rentang harga token.
        </p>
      </div>

      {/* Top Advertisement */}
      <AdBanner slot="top" />

      {/* Interactive Filter and Grid Component */}
      <Suspense fallback={<div className="p-12 text-center text-sm text-slate-400">Memuat katalog model...</div>}>
        <ModelsFilterView initialModels={allModels} />
      </Suspense>

      {/* Bottom Advertisement */}
      <AdBanner slot="bottom" />
    </div>
  );
}
