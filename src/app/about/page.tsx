import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import AdBanner from '@/components/AdBanner';
import { ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang OpenAI Models Compare',
  description: 'Portal referensi independen untuk membantu developer dan pengambil keputusan membandingkan model AI OpenAI secara objektif.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tentang Kami</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Misi & Prinsip Redaksi Kami
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Membantu para rekayasawan perangkat lunak, peneliti, dan pengambil keputusan bisnis menavigasi ekosistem model AI yang berkembang pesat.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Main Content */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Mengapa OpenAI Models Compare Dibuat?
          </h2>
          <p>
            Dengan hadirnya puluhan model AI dari berbagai generasi—mulai dari model penalaran mendalam (*reasoning* o-series), model omnimodal (*GPT-4o*), hingga model sintesis audio dan gambar—pengembang kerap menghadapi kesulitan untuk menentukan model mana yang paling tepat untuk use-case spesifik mereka dan berapa estimasi anggaran yang dibutuhkan.
          </p>
          <p>
            <strong>OpenAI Models Compare</strong> hadir sebagai portal ensiklopedia dan komparasi teknis yang menyatukan data spesifikasi resmi, harga token terkini, batas context window, dan panduan penggunaan praktis dalam satu antarmuka yang bersih dan interaktif.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Sumber Data & Metodologi Objektif
          </h2>
          <ul className="space-y-2 list-disc list-inside text-xs pl-2">
            <li><strong>Dokumentasi Resmi Utama:</strong> Seluruh spesifikasi teknis, batas jendela konteks, dan harga per 1M token merujuk langsung ke dokumentasi resmi OpenAI Developers dan pengumuman resmi platform.</li>
            <li><strong>Tanpa Penilaian Subjektif:</strong> Kami tidak membuat sistem penilaian acak ("10/10") tanpa metodologi terbuka. Setiap rekomendasi diukur murni berdasarkan tolok ukur benchmark baku (seperti SWE-bench, GPQA, MMLU) dan karakteristik arsitektur model.</li>
            <li><strong>Transparansi Data Belum Terverifikasi:</strong> Untuk model konsep frontier atau data harga yang belum diumumkan resmi oleh OpenAI, sistem kami secara eksplisit melabelinya sebagai "Belum tersedia / N/A" demi integritas data.</li>
          </ul>
        </section>

        {/* Section 27 Mandatory Disclosure */}
        <section className="p-5 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <strong className="text-slate-900 dark:text-white text-sm block font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-500" />
            <span>Pernyataan Penafian Independensi (Disclaimer)</span>
          </strong>
          <p className="italic text-slate-600 dark:text-slate-300">
            "{siteConfig.name} adalah website informasi independen dan bukan website resmi OpenAI."
          </p>
          <p className="italic text-slate-600 dark:text-slate-300">
            "Nama, logo, dan merek OpenAI merupakan milik pemiliknya masing-masing."
          </p>
          <p className="italic text-slate-600 dark:text-slate-300">
            "Informasi model, harga, kemampuan, dan status dapat berubah sewaktu-waktu. Selalu periksa dokumentasi resmi OpenAI untuk informasi terbaru."
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
          <Link href="/models" className="text-emerald-500 font-bold hover:underline">
            Eksplorasi Katalog Model Sekarang &rarr;
          </Link>
          <Link href="/contact" className="text-slate-500 hover:underline">
            Hubungi Kami
          </Link>
        </div>

      </div>

      <AdBanner slot="bottom" />

    </div>
  );
}
