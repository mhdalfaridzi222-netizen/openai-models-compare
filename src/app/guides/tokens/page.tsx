import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import { BookOpen, Sparkles, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apa Itu Token pada AI? Panduan Lengkap Input, Output, & Caching',
  description: 'Pahami apa itu token AI, cara menghitung token dari kata, perbedaan input vs output token, dan mekanisme diskon prompt caching OpenAI.',
};

export default function GuideTokensPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:underline">Panduan</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-semibold">Penjelasan Token</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Panduan Pemula</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Apa Itu Token pada Model AI?
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Penjelasan sederhana mengenai unit dasar komputasi teks AI, bagaimana token dihitung, serta mengapa tarif input dan output token dibedakan.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Main Content Article */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Definisi Token: Bagaimana AI Membaca Teks
          </h2>
          <p>
            Model AI seperti GPT-4o atau o3-mini tidak memproses kalimat huruf demi huruf atau kata demi kata seperti manusia. Sebaliknya, model menggunakan algoritma *tokenizer* (seperti `cl100k_base` atau `o200k_base`) yang memotong teks menjadi fragmen kecil yang disebut <strong>token</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 font-mono text-xs">
            <span className="text-slate-400 block mb-1 font-sans font-bold">Aturan Praktis (Rule of Thumb):</span>
            <ul className="space-y-1 list-disc list-inside text-slate-800 dark:text-slate-200">
              <li>1 token ≈ 4 karakter teks bahasa Inggris</li>
              <li>1 token ≈ 0.75 kata</li>
              <li>100 token ≈ 75 kata</li>
              <li>1 halaman dokumen standar (500 kata) ≈ 650–700 token</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Perbedaan Input Token vs Output Token
          </h2>
          <p>
            Dalam dokumentasi dan penagihan OpenAI API, biaya selalu dipisahkan menjadi dua jenis:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
              <strong className="text-emerald-700 dark:text-emerald-300 text-sm block">Input Tokens (Prompt)</strong>
              <p className="text-xs">
                Semua teks yang Anda kirimkan ke model: instruksi sistem, konteks dokumen RAG, riwayat obrolan masa lalu, dan pertanyaan pengguna saat ini. Harganya jauh lebih murah karena diproses secara paralel oleh GPU.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1.5">
              <strong className="text-blue-700 dark:text-blue-300 text-sm block">Output Tokens (Completion)</strong>
              <p className="text-xs">
                Teks yang diproduksi dan dikembalikan oleh model AI kepada Anda. Harganya umumnya 3 hingga 5 kali lipat lebih mahal dibanding input token karena model harus menghasilkan token satu per satu secara berurutan (*autoregressive inference*).
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Apa Itu Cached Input Tokens?
          </h2>
          <p>
            Pada model generasi terbaru (GPT-4o, GPT-4o mini, o3-mini), OpenAI memperkenalkan fitur <strong>Prompt Caching</strong> otomatis. Ketika Anda mengirimkan prompt panjang yang awalan konteksnya sama persis (minimal 1.024 token) dalam kurun waktu 5–10 menit:
          </p>
          <ul className="space-y-2 list-disc list-inside pl-2 text-xs">
            <li>Sistem OpenAI tidak perlu mengkalkulasi ulang representasi KV cache dari teks awal tersebut.</li>
            <li>Anda otomatis mendapatkan potongan harga <strong>50%</strong> untuk seluruh token yang berhasil diambil dari cache (*cached input discount*).</li>
            <li>Latensi generasi token pertama menjadi jauh lebih instan.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Contoh Simulasi Perhitungan Sederhana
          </h2>
          <p>
            Misalkan Anda membuat chatbot layanan pelanggan berbasis <strong>GPT-4o mini</strong> ($0.15 / 1M input, $0.60 / 1M output):
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
            <p>1.000 panggilan per hari:</p>
            <p>• Rata-rata Input: 2.000 token x 1.000 = 2.000.000 token/hari</p>
            <p>• Rata-rata Output: 400 token x 1.000 = 400.000 token/hari</p>
            <p className="pt-2 text-emerald-500 font-bold">• Biaya Input harian: 2 x $0.15 = $0.30</p>
            <p className="text-blue-500 font-bold">• Biaya Output harian: 0.4 x $0.60 = $0.24</p>
            <p className="pt-1 font-sans font-bold text-slate-900 dark:text-white">Total per hari: $0.54 (≈ Rp 8.640)</p>
            <p className="font-sans font-bold text-slate-900 dark:text-white">Total per bulan (30 hari): $16.20 (≈ Rp 259.200)</p>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/calculator"
            className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Calculator className="w-4 h-4" />
            <span>Coba Simulasi di Kalkulator Token</span>
          </Link>
          <Link
            href="/guides/context-window"
            className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1"
          >
            <span>Selanjutnya: Pelajari Jendela Konteks (Context Window) &rarr;</span>
          </Link>
        </div>

      </div>

      <AdBanner slot="bottom" />

    </div>
  );
}
