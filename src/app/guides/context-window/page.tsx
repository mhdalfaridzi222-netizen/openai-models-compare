import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import { Layers, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apa Itu Context Window pada Model AI? Penjelasan Lengkap',
  description: 'Pelajari apa itu context window (jendela konteks), batas memori model AI, mengapa kapasitas 128k hingga 1M token sangat penting untuk dokumen panjang.',
};

export default function GuideContextWindowPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:underline">Panduan</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-semibold">Context Window</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Arsitektur AI Dasar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Apa Itu Context Window pada Model AI?
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Mengapa kapasitas memori kerja model bahasa menentukan seberapa banyak buku, kode program, atau riwayat obrolan yang dapat dicerna dalam satu waktu.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Content */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Definisi Jendela Konteks (Context Window)
          </h2>
          <p>
            <strong>Context Window</strong> (jendela konteks) adalah batas kapasitas memori kerja jangka pendek (*RAM kognitif*) suatu model AI dalam satu kali siklus pemanggilan (*inference request*).
          </p>
          <p>
            Batas ini mencakup <strong>total gabungan</strong> dari semua input token yang Anda masukkan ditambah output token yang akan diproduksi oleh model. Jika jumlah token gabungan melebihi batas context window model, pemanggilan API akan ditolak dengan error <em>context_length_exceeded</em>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Evolusi Kapasitas Context Window OpenAI
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 font-bold uppercase">
                <tr>
                  <th className="p-3">Generasi Model</th>
                  <th className="p-3">Context Window</th>
                  <th className="p-3">Setara Buku / Halaman</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-semibold">GPT-3 (Original)</td>
                  <td className="p-3 font-mono">2.048 token</td>
                  <td className="p-3 text-slate-500">~3 halaman dokumen</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">GPT-3.5 Turbo</td>
                  <td className="p-3 font-mono">4.096 - 16.384 token</td>
                  <td className="p-3 text-slate-500">~5 - 25 halaman dokumen</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">GPT-4 (Original)</td>
                  <td className="p-3 font-mono">8.192 token</td>
                  <td className="p-3 text-slate-500">~12 halaman dokumen</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">GPT-4 Turbo / GPT-4o / o1</td>
                  <td className="p-3 font-mono font-bold text-emerald-500">128.000 - 200.000 token</td>
                  <td className="p-3 text-slate-500">~300 halaman buku tebal (1 novel)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">GPT-6 Luna (Next-Gen)</td>
                  <td className="p-3 font-mono font-bold text-purple-500">1.050.000 token</td>
                  <td className="p-3 text-slate-500">Seluruh codebase repositori raksasa (~2.000 halaman)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Mengapa Context Window Besar Sangat Penting?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 space-y-1.5">
              <strong className="text-slate-900 dark:text-white text-xs block">Analisis Dokumen Legal & Finansial</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Memungkinkan Anda mengunggah PDF laporan tahunan 100+ halaman sekaligus tanpa perlu memotongnya secara manual.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 space-y-1.5">
              <strong className="text-slate-900 dark:text-white text-xs block">Coding Seluruh Repositori</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Agen coding dapat membaca puluhan file TypeScript/Python dan skema database sekaligus untuk memahami arsitektur aplikasi secara holistik.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Keterbatasan: Masalah "Lost in the Middle"
          </h2>
          <p>
            Meskipun model modern memiliki context window 128k hingga 1M token, penelitian akademis menunjukkan fenomena <em>"Lost in the Middle"</em>: model cenderung mengingat informasi yang berada di awal dan di akhir prompt dengan sangat akurat, namun terkadang kurang teliti mengambil fakta kecil yang terselip persis di bagian tengah dokumen raksasa.
          </p>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Tips Praktis:</strong> Letakkan instruksi terpenting atau kriteria evaluasi Anda di akhir prompt, tepat sebelum teks input pengguna, untuk hasil yang paling presisi.
            </span>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
          <Link href="/guides/tokens" className="text-slate-500 hover:underline">
            &larr; Kembali ke Panduan Token
          </Link>
          <Link href="/guides/api-vs-chatgpt" className="text-emerald-500 font-bold hover:underline">
            Lanjut: Perbedaan ChatGPT vs OpenAI API &rarr;
          </Link>
        </div>

      </div>

      <AdBanner slot="bottom" />

    </div>
  );
}
