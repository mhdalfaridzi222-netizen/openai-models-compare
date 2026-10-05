import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import { Layers, Info, Check, X, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Perbedaan Model di ChatGPT vs Model di OpenAI API',
  description: 'Pahami mengapa model yang ada di antarmuka ChatGPT tidak selalu sama dengan model yang tersedia di endpoint OpenAI Developers API.',
};

export default function GuideApiVsChatGptPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:underline">Panduan</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-semibold">ChatGPT vs OpenAI API</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Info className="w-3.5 h-3.5" />
          <span>Panduan Arsitektur & Layanan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Perbedaan Model di ChatGPT dan Model di OpenAI API
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Mengapa pilihan model yang Anda temui saat membuka antarmuka web ChatGPT tidak sama persis dengan katalog API yang diakses para pengembang perangkat lunak.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Main Content Article */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Dua Produk Berbeda untuk Dua Kebutuhan Berbeda
          </h2>
          <p>
            Banyak pemula berasumsi bahwa ChatGPT dan OpenAI API adalah produk yang sama dengan kemasan berbeda. Kenyataannya:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 space-y-2">
              <strong className="text-slate-900 dark:text-white text-base block font-bold">ChatGPT (Aplikasi Konsumen)</strong>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Merupakan produk aplikasi konsumen siap pakai dengan antarmuka chat visual. OpenAI mengemas model dengan layer sistem tambahan: pemotong konteks otomatis, memori jangka panjang profil, routing model otomatis, serta pembatasan kuota pesan per jam (misal 40 pesan per 3 jam untuk GPT-4o di paket Plus).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <strong className="text-emerald-700 dark:text-emerald-300 text-base block font-bold">OpenAI API (Platform Pengembang)</strong>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Merupakan antarmuka pemrograman terprogram (*raw API endpoints*) untuk software engineer. Anda membayar murni berdasarkan jumlah token yang dikonsumsi (*pay-per-token*), memiliki kendali mutlak atas parameter `temperature`, `max_completion_tokens`, `system prompt`, serta akses ke model khusus seperti Embeddings dan Moderation.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Apakah Semua Model API Tersedia di ChatGPT?
          </h2>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
            <strong>Fakta Penting:</strong> Tidak semua model API tersedia di ChatGPT, dan sebaliknya. Jangan menyatakan bahwa semua model API pasti dapat dipilih di antarmuka ChatGPT.
          </div>
          <p>
            Sebagai contoh:
          </p>
          <ul className="space-y-2 list-disc list-inside text-xs pl-2">
            <li>Model <strong>Embeddings</strong> (`text-embedding-3-small`, `text-embedding-3-large`) hanya ada di API untuk komputasi vektor pencarian semantik dan tidak memiliki antarmuka chat.</li>
            <li>Model <strong>Moderasi</strong> (`omni-moderation-latest`) hanya ada di API untuk penyaringan teks/gambar berbahaya.</li>
            <li>Model <strong>Snapshot Versi Tertentu</strong> (seperti `gpt-4o-2024-08-06` dengan garansi determinisme Structured Outputs) hanya dapat dipanggil via API untuk menjaga keandalan sistem produksi tanpa khawatir perilaku model berubah tiba-tiba.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Ringkasan Perbedaan Utama
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 uppercase font-bold">
                <tr>
                  <th className="p-3">Aspek</th>
                  <th className="p-3">ChatGPT (Plus/Team/Pro)</th>
                  <th className="p-3">OpenAI Developers API</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-semibold">Skema Biaya</td>
                  <td className="p-3">Langganan bulanan flat ($20–$200/bln)</td>
                  <td className="p-3 font-mono text-emerald-500 font-bold">Pay-as-you-go per 1M token</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Akses Snapshot ID</td>
                  <td className="p-3 text-slate-400">Tidak (Otomatis versi terbaru)</td>
                  <td className="p-3 text-emerald-500 font-bold">Ya (Dapat pin ke tanggal tertentu)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Structured Outputs</td>
                  <td className="p-3 text-slate-400">Tidak ada kontrol skema JSON ketat</td>
                  <td className="p-3 text-emerald-500 font-bold">Ya (100% adherence ke JSON Schema)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Privasi Data API</td>
                  <td className="p-3">Dapat memilih opt-out di setelan</td>
                  <td className="p-3 font-semibold">Secara default TIDAK digunakan untuk training</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
          <Link href="/guides" className="text-slate-500 hover:underline">
            &larr; Indeks Panduan
          </Link>
          <Link href="/models" className="text-emerald-500 font-bold hover:underline">
            Eksplorasi Katalog Model API &rarr;
          </Link>
        </div>

      </div>

      <AdBanner slot="bottom" />

    </div>
  );
}
