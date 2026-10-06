import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, ExternalLink, ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Disclaimer Resmi & Batasan Tanggung Jawab',
  description: 'Pernyataan independensi dan batasan tanggung jawab portal OpenAI Models Compare. Bukan situs resmi OpenAI.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Beranda</span>
      </Link>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Pernyataan Hukum & Independensi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Disclaimer & Batasan Tanggung Jawab
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Terakhir diperbarui: 6 Oktober 2026
        </p>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            1. Situs Independen & Bukan Afiliasi Resmi
          </h2>
          <p>
            <strong>{siteConfig.name}</strong> adalah platform ensiklopedia dan komparasi teknologi independen yang dibuat semata-mata untuk tujuan edukasi, analisis teknis, dan kemudahan referensi pengembang.
          </p>
          <p>
            Website ini <strong>TIDAK berafiliasi, disponsori, didukung, atau terafiliasi secara resmi dengan OpenAI OpCo, LLC, OpenAI Ireland Ltd, atau entitas anak perusahaannya</strong>. Seluruh nama produk, merek dagang, logo, dan identitas visual OpenAI yang disebutkan adalah milik sah pemegang hak cipta masing-masing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            2. Dinamika Informasi & Pembaruan Data
          </h2>
          <p>
            Dunia kecerdasan buatan berkembang dengan sangat cepat. Parameter berikut dapat berubah sewaktu-waktu oleh OpenAI tanpa pemberitahuan sebelumnya:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
            <li>Tarif harga token (input, cached input, output, dan batch).</li>
            <li>Kemampuan model (multimodal, reasoning tokens, rate limits, context window).</li>
            <li>Status siklus hidup model (aktif, deprecated, atau dimatikan/shutdown).</li>
            <li>Dukungan fitur API seperti function calling, JSON schema, atau streaming.</li>
          </ul>
          <p>
            Meskipun tim kami secara rutin memverifikasi data terhadap dokumentasi resmi, kami tidak memberikan jaminan mutlak atas kebaruan seketika dari setiap perubahan yang terjadi. Pengembang selalu disarankan untuk merujuk langsung ke{' '}
            <a
              href="https://platform.openai.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 underline font-semibold inline-flex items-center gap-1"
            >
              <span>Dokumentasi Resmi OpenAI</span>
              <ExternalLink className="w-3 h-3" />
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            3. Estimasi Kalkulator Biaya (Price Calculator)
          </h2>
          <p>
            Perhitungan pada halaman <strong>Token Cost Calculator</strong> merupakan simulasi matematika estimatif berdasarkan data tarif resmi yang tersimpan di sistem kami. Hasil kalkulasi dapat berbeda dari tagihan faktual pada dashboard OpenAI Anda karena faktor:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
            <li>Variasi rasio tokenisasi tokenizer (*tiktoken*) pada bahasa selain bahasa Inggris.</li>
            <li>Overhead token sistem instruksi tersembunyi (*system prompt*).</li>
            <li>Penggunaan reasoning tokens tak terduga pada model o-series.</li>
            <li>Pajak pertambahan nilai (PPN) lokal dan fluktuasi kurs mata uang bank.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            4. Batasan Tanggung Jawab Finansial
          </h2>
          <p>
            Pemilik dan pengelola website ini tidak bertanggung jawab atas kerugian finansial, kegagalan arsitektur perangkat lunak, pembengkakan tagihan API, atau keputusan bisnis apa pun yang diambil berdasarkan informasi di portal ini.
          </p>
        </section>
      </div>
    </div>
  );
}
