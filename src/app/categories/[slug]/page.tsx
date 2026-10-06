import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategories, getAllModels } from '@/lib/db';
import ModelCard from '@/components/ModelCard';
import AdBanner from '@/components/AdBanner';
import { ArrowLeft, Layers } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return { title: 'Kategori Tidak Ditemukan' };

  return {
    title: `${category.name} — Daftar Model OpenAI & Spesifikasi`,
    description: `${category.description} Pelajari dan bandingkan model dalam kategori ${category.name}.`,
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const [categories, allModels] = await Promise.all([
    getCategories(),
    getAllModels()
  ]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const categoryModels = allModels.filter((m) => m.category === category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Semua Kategori</span>
        </Link>

        <span className="text-xs text-slate-400">
          {categoryModels.length} Model Ditemukan
        </span>
      </div>

      {/* Category Hero */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20 mb-1">
              <span>Kategori Model</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {category.name}
            </h1>
          </div>
        </div>

        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {category.tagline}
        </p>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {category.description}
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Models Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Daftar Model dalam Kategori {category.name}
        </h2>

        {categoryModels.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
            Belum ada model aktif dalam kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryModels.map((m) => (
              <ModelCard key={m.id} model={m} />
            ))}
          </div>
        )}
      </div>

      <AdBanner slot="bottom" />
    </div>
  );
}
