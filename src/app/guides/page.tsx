import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import { BookOpen, Layers, Coins, Info, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Panduan Fundamental Model OpenAI (Tokens, Context Window, API)',
  description: 'Kumpulan panduan teknis esensial untuk memahami cara kerja token, perhitungan context window, dan perbedaan ChatGPT vs OpenAI API.',
};

export default function GuidesIndexPage() {
  const guides = [
    {
      title: 'Apa Itu Token pada Model AI?',
      slug: 'tokens',
      description: 'Pahami cara tokenizer memecah kata, perbedaan token input vs output, serta mekanisme hemat 50% lewat Prompt Caching.',
      icon: <Coins className="w-6 h-6 text-emerald-500" />,
      tag: 'Biaya & Finansial',
    },
    {
      title: 'Apa Itu Context Window pada Model AI?',
      slug: 'context-window',
      description: 'Mengapa jendela konteks menentukan kemampuan model mengingat dokumen buku panjang, dan fenomena lost-in-the-middle.',
      icon: <Layers className="w-6 h-6 text-blue-500" />,
      tag: 'Arsitektur Memori',
    },
    {
      title: 'Perbedaan Model di ChatGPT vs Model di OpenAI API',
      slug: 'api-vs-chatgpt',
      description: 'Klarifikasi perbedaan antara produk langganan ChatGPT konsumen dengan endpoint API terprogram tanpa kuota per jam.',
      icon: <Info className="w-6 h-6 text-purple-500" />,
      tag: 'Ekosistem Layanan',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Pusat Pengetahuan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Panduan Fundamental OpenAI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Materi edukasi dasar dan mendalam yang dirancang untuk membantu Anda memahami terminologi teknis ekosistem kecerdasan buatan OpenAI.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                {g.icon}
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 block">
                {g.tag}
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                {g.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {g.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between text-xs font-bold text-emerald-500">
              <span>Buka Panduan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <AdBanner slot="bottom" />

    </div>
  );
}
