import Link from 'next/link';
import { Home, Search, Scale, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#111827] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto font-mono text-2xl font-extrabold">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Model atau halaman yang Anda cari mungkin telah dipindahkan, diganti namanya, atau belum terdaftar dalam basis data kami.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2 text-xs font-semibold">
          <Link
            href="/"
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors flex items-center justify-center gap-2 shadow"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/models"
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#161f30] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
          >
            <Search className="w-4 h-4" />
            <span>Jelajahi Katalog Model</span>
          </Link>
          <Link
            href="/compare"
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#161f30] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
          >
            <Scale className="w-4 h-4" />
            <span>Buka Alat Pembanding</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
