import type { Metadata } from 'next';
import { getAllModels } from '@/data/models';
import TokenCalculator from '@/components/TokenCalculator';
import AdBanner from '@/components/AdBanner';
import { Calculator, Info, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kalkulator Biaya Token OpenAI API (Token Cost Calculator)',
  description: 'Simulasikan estimasi biaya bulanan API OpenAI dengan kalkulator interaktif: input token, output token, prompt caching, dan batch API discount.',
};

export default function CalculatorPage() {
  const allModels = getAllModels();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Calculator className="w-3.5 h-3.5" />
          <span>Simulasi Finansial API</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Kalkulator Biaya Token OpenAI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Hitung estimasi pengeluaran bulanan OpenAI API Anda secara presisi berdasarkan volume input token, respon output, fitur caching, dan model yang Anda gunakan.
        </p>
      </div>

      {/* Top Advertisement */}
      <AdBanner slot="top" />

      {/* Calculator Component */}
      <TokenCalculator models={allModels} defaultModelId="gpt-4o-mini" />

      {/* Explanation of Token Cost Factors */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Faktor yang Mempengaruhi Biaya API OpenAI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300">
          
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Prompt Caching (Hemat 50%)</span>
            </h3>
            <p className="leading-relaxed">
              OpenAI secara otomatis menyimpan cache awalan prompt yang panjangnya di atas 1.024 token. Pemanggilan berulang dengan sistem prompt yang sama mendapatkan potongan harga input 50%.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Batch API (Hemat 50%)</span>
            </h3>
            <p className="leading-relaxed">
              Jika pekerjaan pemrosesan data Anda tidak memerlukan respon seketika (asinkron dalam jendela waktu 24 jam), gunakan endpoint Batch API untuk diskon langsung 50% untuk input dan output.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Reasoning Tokens (o-series)</span>
            </h3>
            <p className="leading-relaxed">
              Pada model penalaran seperti o1 dan o3-mini, proses internal thinking juga dihitung sebagai token output dan ditagih sesuai tarif output token model bersangkutan.
            </p>
          </div>

        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
          <Link href="/guides/tokens" className="text-emerald-500 font-bold hover:underline">
            Baca Panduan Lengkap: Apa Itu Token dan Cara Kerjanya &rarr;
          </Link>
          <span className="text-slate-400">Nilai tukar asumsi: $1 = Rp 16.000</span>
        </div>
      </div>

      {/* Bottom Advertisement */}
      <AdBanner slot="bottom" />

    </div>
  );
}
