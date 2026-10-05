import type { Metadata } from 'next';
import Link from 'next/link';
import { getModelsByStatus } from '@/data/models';
import ModelStatusBadge from '@/components/ModelStatusBadge';
import AdBanner from '@/components/AdBanner';
import { History, ArrowRight, AlertTriangle, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Basis Data Historis Model OpenAI Deprecated & Retired',
  description: 'Daftar resmi model-model OpenAI lama yang sudah tidak direkomendasikan (deprecated) atau telah dimatikan secara permanen (shutdown/retired) beserta model penggantinya.',
};

export default function DeprecatedModelsPage() {
  const deprecatedModels = getModelsByStatus('DEPRECATED');
  const retiredModels = getModelsByStatus('RETIRED');
  const allHistorical = [...deprecatedModels, ...retiredModels];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold border border-orange-500/20">
          <History className="w-3.5 h-3.5" />
          <span>Arsip Siklus Hidup API</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Model Deprecated & Retired OpenAI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Pangkalan data historis model-model lama yang sudah usang atau telah dinonaktifkan permanen, lengkap dengan tanggal penghentian dan rekomendasi model pengganti.
        </p>
      </div>

      {/* Top Advertisement */}
      <AdBanner slot="top" />

      {/* Warning Notice Box */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3.5 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
        <div>
          <strong className="block font-bold text-sm text-slate-900 dark:text-white mb-1">
            Penting Bagi Pengembang Sistem Produksi:
          </strong>
          Model dengan status <strong>DEPRECATED</strong> masih dapat dipanggil sementara waktu namun tidak menerima pembaruan fitur. Model dengan status <strong>RETIRED</strong> telah dimatikan secara permanen di server OpenAI dan akan menghasilkan error jika dipanggil. Segera perbarui kode Anda ke model pengganti yang disarankan.
        </div>
      </div>

      {/* Table of Historical Models */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-6">Nama Model</th>
                <th className="py-4 px-4 font-mono">Model ID</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4">Tanggal Deprecated</th>
                <th className="py-4 px-4">Tanggal Shutdown</th>
                <th className="py-4 px-6 text-right">Pengganti Direkomendasikan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              {allHistorical.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40 transition-colors">
                  
                  {/* Name & link */}
                  <td className="py-4 px-6">
                    <Link href={`/models/${m.slug}`} className="font-bold text-slate-900 dark:text-white hover:text-emerald-500 transition-colors">
                      {m.name}
                    </Link>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{m.family}</span>
                  </td>

                  {/* Model ID */}
                  <td className="py-4 px-4 font-mono text-slate-500 dark:text-slate-400">
                    {m.modelId}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 text-center">
                    <ModelStatusBadge status={m.status} />
                  </td>

                  {/* Deprecated Date */}
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                    {m.deprecatedDate || 'N/A'}
                  </td>

                  {/* Shutdown Date */}
                  <td className="py-4 px-4 font-mono text-slate-600 dark:text-slate-300">
                    {m.shutdownDate ? (
                      <span className="text-rose-500 font-bold">{m.shutdownDate}</span>
                    ) : (
                      <span className="text-slate-400">Belum Ditentukan</span>
                    )}
                  </td>

                  {/* Recommended Replacement */}
                  <td className="py-4 px-6 text-right">
                    {m.recommendedReplacement ? (
                      <Link
                        href={`/models/${m.recommendedReplacement}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white font-mono font-bold text-xs transition-all border border-emerald-500/20"
                      >
                        <span>{m.recommendedReplacement}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Advertisement */}
      <AdBanner slot="bottom" />

    </div>
  );
}
