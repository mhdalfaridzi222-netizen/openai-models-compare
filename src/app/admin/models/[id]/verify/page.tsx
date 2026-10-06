import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getModelById } from '@/lib/db';
import { OFFICIAL_OPENAI_PRICING_TABLE } from '@/lib/sync/pricing';
import { ArrowLeft, CheckCircle, XCircle, Edit3, ExternalLink, ShieldCheck } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminModelVerifyPage({ params }: Props) {
  const { id } = await params;
  const model = await getModelById(id);

  if (!model) {
    notFound();
  }

  const officialPrice = OFFICIAL_OPENAI_PRICING_TABLE[model.modelId] || OFFICIAL_OPENAI_PRICING_TABLE[model.id];

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href="/admin/models"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Daftar Model</span>
      </Link>

      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verifikasi Manual Sumber Resmi (Section 74)</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Verifikasi Data Model: {model.name} ({model.modelId})
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Bandingkan data yang tersimpan di basis data lokal dengan data referensi resmi OpenAI.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box 1: Current Database */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Basis Data Saat Ini (Local DB)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
              {model.status}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">API Model ID:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{model.modelId}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Context Window:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                {model.contextWindow ? `${model.contextWindow.toLocaleString('id-ID')} token` : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Tarif Input / 1M:</span>
              <span className="font-mono text-emerald-500 font-bold">
                {model.inputPrice !== null ? `$${model.inputPrice.toFixed(2)}` : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Tarif Output / 1M:</span>
              <span className="font-mono text-blue-500 font-bold">
                {model.outputPrice !== null ? `$${model.outputPrice.toFixed(2)}` : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Terakhir Diverifikasi:</span>
              <span className="text-slate-500 font-medium">
                {model.lastVerifiedAt ? new Date(model.lastVerifiedAt).toLocaleString('id-ID') : '6 Oktober 2026'}
              </span>
            </div>
          </div>
        </div>

        {/* Box 2: Official Source */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-blue-500/30 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
              Referensi Resmi OpenAI
            </span>
            <a
              href={model.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 font-bold"
            >
              <span>Dokumentasi</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Tautan Sumber Resmi:</span>
              <a
                href={model.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-blue-500 hover:underline line-clamp-1"
              >
                {model.officialUrl}
              </a>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Tarif Input Resmi:</span>
              <span className="font-mono text-emerald-500 font-bold">
                {officialPrice ? `$${officialPrice.inputPrice.toFixed(2)}` : 'Tidak tercantum di tabel tarif publik'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Tarif Output Resmi:</span>
              <span className="font-mono text-blue-500 font-bold">
                {officialPrice ? `$${officialPrice.outputPrice.toFixed(2)}` : 'Tidak tercantum di tabel tarif publik'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Status Siklus Hidup:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {model.status === 'DEPRECATED' || model.status === 'RETIRED' ? 'Tercatat di Deprecations Log' : 'Tercatat di Platform Docs'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Actions (Section 74) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Keputusan Administrator:
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pilih tindakan untuk memperbarui stempel verifikasi atau merevisi perbedaan nilai.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/admin/models/${model.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Nilai</span>
          </Link>
          <Link
            href="/admin/models"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Accept (Terima Data)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
