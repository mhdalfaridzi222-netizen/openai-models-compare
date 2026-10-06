import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllModels } from '@/lib/db';
import { COMPARISON_PRESETS } from '@/data/comparisons';
import ComparisonView from '@/components/ComparisonView';
import AdBanner from '@/components/AdBanner';
import { Scale } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split('-vs-');
  const title = parts.map(p => p.toUpperCase()).join(' vs ');

  return {
    title: `Perbandingan ${title} — Komparasi Spesifikasi & Tarif Resmi`,
    description: `Bandingkan ${title} secara mendalam: context window, tarif token input/output, penalaran reasoning, dan dukungan fitur multimodal.`
  };
}

export async function generateStaticParams() {
  const presets = COMPARISON_PRESETS.map(p => ({ slug: p.slug }));
  return [
    ...presets,
    { slug: 'gpt-4o-vs-o3-mini' },
    { slug: 'gpt-4o-vs-gpt-4o-mini' },
    { slug: 'o1-vs-o3-mini' }
  ];
}

export default async function CompareSlugPage({ params }: Props) {
  const { slug } = await params;
  const allModels = await getAllModels();

  // Split slug by '-vs-'
  const parts = slug.split('-vs-');
  if (parts.length < 2) {
    notFound();
  }

  const modelA = parts[0];
  const modelB = parts[1];
  const modelC = parts[2] || undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Scale className="w-3.5 h-3.5" />
          <span>Alat Pembanding Multi-Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Perbandingan {parts.map(p => p.toUpperCase()).join(' vs ')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Tabel komparasi teknis langsung dari basis data model OpenAI. Periksa perbedaan tarif token, penalaran logika, dan parameter arsitektur.
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
              href={`/compare/${preset.slug}`}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161f30] hover:border-emerald-500 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
            >
              {preset.title}
            </Link>
          ))}
        </div>
      </div>

      <AdBanner slot="top" />

      <Suspense fallback={<div className="p-12 text-center text-sm text-slate-400">Menyiapkan matriks perbandingan...</div>}>
        <ComparisonView
          allModels={allModels}
          initialModelA={modelA}
          initialModelB={modelB}
          initialModelC={modelC}
        />
      </Suspense>

      <AdBanner slot="bottom" />
    </div>
  );
}
