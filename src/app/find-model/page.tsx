import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllModels } from '@/lib/db';
import ModelFinderClient from './ModelFinderClient';
import AdBanner from '@/components/AdBanner';
import { Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Model Finder — Temukan Model OpenAI Paling Tepat untuk Use Case Anda',
  description: 'Gunakan filter deterministik untuk menemukan model OpenAI ideal berdasarkan kebutuhan: Coding, Reasoning, Audio, Image, Long Context, atau Efisiensi Biaya.',
};

export default async function FindModelPage() {
  const models = await getAllModels();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Compass className="w-3.5 h-3.5" />
          <span>Deterministic Model Finder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Temukan Model OpenAI Sesuai Kebutuhan
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Pilih satu atau beberapa kriteria di bawah. Algoritma deterministik akan menyortir dan menampilkan model yang memenuhi parameter teknis Anda tanpa estimasi spekulatif.
        </p>
      </div>

      <AdBanner slot="top" />

      <Suspense fallback={<div className="p-12 text-center text-sm text-slate-400">Memuat filter model...</div>}>
        <ModelFinderClient allModels={models} />
      </Suspense>

      <AdBanner slot="bottom" />
    </div>
  );
}
