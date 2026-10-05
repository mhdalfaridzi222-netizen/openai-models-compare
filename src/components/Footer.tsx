import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-[#070a12] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              {siteConfig.tagline}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Portal ensiklopedia independen untuk analisis teknis, spesifikasi, dan komparasi objektif ekosistem model kecerdasan buatan OpenAI.
            </p>
          </div>

          {/* Column 2: Navigasi Model */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Katalog & Komparasi
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/models" className="hover:text-emerald-400 transition-colors">
                  Semua Model OpenAI
                </Link>
              </li>
              <li>
                <Link href="/compare?a=gpt-4o&b=o3-mini" className="hover:text-emerald-400 transition-colors">
                  GPT-4o vs o3-mini
                </Link>
              </li>
              <li>
                <Link href="/compare?a=gpt-6-astra&b=gpt-6-1-sol&c=gpt-6-luna" className="hover:text-emerald-400 transition-colors">
                  GPT-6 Astra vs Sol vs Luna
                </Link>
              </li>
              <li>
                <Link href="/models?category=reasoning" className="hover:text-emerald-400 transition-colors">
                  Model Penalaran (o-Series)
                </Link>
              </li>
              <li>
                <Link href="/models/deprecated" className="hover:text-emerald-400 transition-colors">
                  Model Deprecated & Retired
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Panduan & Edukasi */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Panduan & Artikel
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/calculator" className="hover:text-emerald-400 transition-colors">
                  Token Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/guides/tokens" className="hover:text-emerald-400 transition-colors">
                  Apa Itu Token & Cara Hitungnya?
                </Link>
              </li>
              <li>
                <Link href="/guides/context-window" className="hover:text-emerald-400 transition-colors">
                  Panduan Context Window
                </Link>
              </li>
              <li>
                <Link href="/guides/api-vs-chatgpt" className="hover:text-emerald-400 transition-colors">
                  Perbedaan ChatGPT vs OpenAI API
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-emerald-400 transition-colors">
                  Timeline Sejarah Model OpenAI
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-emerald-400 transition-colors">
                  Kumpulan Artikel Analisis
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kebijakan & Kontak */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Informasi Situs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Tentang Portal
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Kebijakan Privasi & AdSense
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Hubungi Tim Redaksi
                </Link>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <span className="block font-semibold text-slate-300">Data Resmi Berdasarkan:</span>
              <span className="block">OpenAI Developers & API Docs</span>
            </div>
          </div>

        </div>

        {/* Mandatory Legal Disclosure (Section 27) */}
        <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800 mb-8 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] sm:text-xs text-slate-400 space-y-1 leading-relaxed">
            <p><strong className="text-slate-200">Pernyataan Pengungkapan (Disclosure):</strong> {siteConfig.disclaimer.independent}</p>
            <p>{siteConfig.disclaimer.trademark} {siteConfig.disclaimer.accuracy}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-300">Metodologi Data</Link>
            <Link href="/privacy" className="hover:text-slate-300">Kebijakan Privasi</Link>
            <Link href="/contact" className="hover:text-slate-300">Kontak</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
