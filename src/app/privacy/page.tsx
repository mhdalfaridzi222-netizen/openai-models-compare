import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import AdBanner from '@/components/AdBanner';
import { ShieldCheck, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi (Privacy Policy)',
  description: 'Kebijakan privasi, penggunaan cookies, penayangan iklan Google AdSense, dan analitik di OpenAI Models Compare.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Keamanan & Data</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Kebijakan Privasi
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Terakhir diperbarui: 6 Oktober 2026. Kami berkomitmen untuk melindungi privasi setiap pengunjung situs kami.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Main Content */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Informasi yang Kami Kumpulkan
          </h2>
          <p>
            {siteConfig.name} tidak mewajibkan registrasi akun atau pengumpulan data pribadi sensitif untuk menggunakan fitur pembanding, katalog, maupun kalkulator token. Kami hanya mengumpulkan informasi analitik agregat tanpa nama seperti jenis peramban, resolusi layar, dan halaman yang diakses untuk tujuan optimalisasi pengalaman pengguna.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. Penggunaan Cookies & LocalStorage
          </h2>
          <p>
            Situs kami menggunakan penyimpanan lokal peramban (*LocalStorage*) murni untuk mengingat preferensi tema tampilan (Gelap atau Terang) yang Anda pilih, sehingga preferensi tersebut tetap tersimpan saat Anda berpindah halaman.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Penayangan Iklan & Google AdSense
          </h2>
          <p>
            Situs ini dipersiapkan untuk menampilkan iklan yang disajikan oleh mitra periklanan pihak ketiga seperti Google AdSense. Vendor pihak ketiga, termasuk Google, dapat menggunakan cookies (seperti Cookie DART) untuk menayangkan iklan kepada pengguna berdasarkan kunjungan mereka sebelumnya ke situs ini atau situs web lain di internet.
          </p>
          <p className="text-xs text-slate-500">
            Pengguna dapat memilih untuk menonaktifkan penggunaan Cookie DART yang dipersonalisasi dengan mengunjungi Kebijakan Privasi Jaringan Iklan dan Konten Google di pengaturan periklanan akun Google masing-masing.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Tautan ke Situs Eksternal
          </h2>
          <p>
            Situs kami mencantumkan tautan langsung ke situs dokumentasi resmi OpenAI (`openai.com`, `platform.openai.com`). Kami tidak bertanggung jawab atas kebijakan privasi atau konten dari situs web eksternal tersebut. Kami menyarankan pengguna membaca kebijakan privasi masing-masing situs yang dikunjungi.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            5. Kontak
          </h2>
          <p>
            Jika Anda memiliki pertanyaan terkait kebijakan privasi ini atau ingin mengajukan saran pembaruan data, silakan hubungi kami melalui halaman <Link href="/contact" className="text-emerald-500 underline font-semibold">Kontak</Link>.
          </p>
        </section>

      </div>

      <AdBanner slot="bottom" />

    </div>
  );
}
