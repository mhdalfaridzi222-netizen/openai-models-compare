import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllModels } from '@/data/models';
import { COMPARISON_PRESETS } from '@/data/comparisons';
import ComparisonView from '@/components/ComparisonView';
import AdBanner from '@/components/AdBanner';
import { Scale, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bandingkan Model OpenAI Berdampingan (Head-to-Head)',
  description: 'Bandingkan hingga 3 model OpenAI secara interaktif: spesifikasi token, harga API per 1M token, reasoning chain-of-thought, modalitas penglihatan & audio.',
};

interface Props {
  searchParams: Promise<{ a?: string; b?: string; c?: string }>;
}

export default async function ComparePage({ searchParams }: Props) {
  const { a = 'gpt-4o', b = 'o3-mini', c = 'gpt-4o-mini' } = await searchParams;
  const allModels = getAllModels();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Scale className="w-3.5 h-3.5" />
          <span>Alat Pembanding Multi-Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Perbandingan Model OpenAI Berdampingan
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Pilih 2 hingga 3 model OpenAI untuk melihat perbedaan parameter teknis, biaya token per juta panggilan, dukungan modalitas, dan tolok ukur kesesuaian use-case.
        </p>
      </div>

      {/* Preset Quick Links */}
      <div className="bg-slate-50 dark:bg-[#111827] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Preset Perbandingan Populer:
        </span>
        <div className="flex flex-wrap gap-2">
          {COMPARISON_PRESETS.map((preset) => (
            <Link
              key={preset.id}
              href={`/compare?a=${preset.modelIds[0]}&b=${preset.modelIds[1]}${preset.modelIds[2] ? `&c=${preset.modelIds[2]}` : ''}`}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161f30] hover:border-emerald-500 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
            >
              {preset.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Top Advertisement */}
      <AdBanner slot="top" />

      {/* Interactive Comparison Component */}
      <Suspense fallback={<div className="p-12 text-center text-sm text-slate-400">Menyiapkan matriks perbandingan...</div>}>
        <ComparisonView
          allModels={allModels}
          initialModelA={a}
          initialModelB={b}
          initialModelC={c}
        />
      </Suspense>

      {/* Bottom Advertisement */}
      <AdBanner slot="bottom" />

    </div>
  );
}
