'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Model } from '@/types/model';
import ModelStatusBadge from '@/components/ModelStatusBadge';
import { 
  Check, 
  X, 
  Copy, 
  CheckCheck, 
  ArrowRight, 
  Brain, 
  Eye, 
  Share2, 
  RefreshCw 
} from 'lucide-react';

interface ComparisonViewProps {
  allModels: Model[];
  initialModelA?: string;
  initialModelB?: string;
  initialModelC?: string;
}

export default function ComparisonView({
  allModels,
  initialModelA = 'gpt-4o',
  initialModelB = 'o3-mini',
  initialModelC = 'gpt-4o-mini',
}: ComparisonViewProps) {
  const [modelAId, setModelAId] = useState(initialModelA);
  const [modelBId, setModelBId] = useState(initialModelB);
  const [modelCId, setModelCId] = useState(initialModelC);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state if initial props change
  useEffect(() => {
    if (initialModelA) setModelAId(initialModelA);
    if (initialModelB) setModelBId(initialModelB);
    if (initialModelC !== undefined) setModelCId(initialModelC);
  }, [initialModelA, initialModelB, initialModelC]);

  const modelA = allModels.find(m => m.id === modelAId || m.slug === modelAId) || allModels[0];
  const modelB = allModels.find(m => m.id === modelBId || m.slug === modelBId) || allModels[1] || allModels[0];
  const modelC = modelCId ? (allModels.find(m => m.id === modelCId || m.slug === modelCId) || null) : null;

  const activeModels = [modelA, modelB, modelC].filter(Boolean) as Model[];

  const formatPrice = (p: number | null) => {
    if (p === null || p === undefined) return 'Belum tersedia';
    if (p === 0) return 'Gratis';
    return `$${p.toFixed(2)} / 1M`;
  };

  const formatContext = (c: number | null) => {
    if (c === null || c === undefined) return 'N/A';
    return `${c.toLocaleString('id-ID')} token`;
  };

  const handleShare = () => {
    const url = new URL(window.location.origin + '/compare');
    url.searchParams.set('a', modelA.id);
    url.searchParams.set('b', modelB.id);
    if (modelC) url.searchParams.set('c', modelC.id);

    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Top Model Selection Bar */}
      <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">
              Konfigurasi Pembanding
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Pilih Hingga 3 Model OpenAI
            </h2>
          </div>

          <button
            onClick={handleShare}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            {copiedLink ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan Perbandingan'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Selector A */}
          <div className="p-3 bg-slate-50 dark:bg-[#161f30] rounded-2xl border border-slate-200 dark:border-slate-800">
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
              Model A (Wajib)
            </label>
            <select
              value={modelA.id}
              onChange={(e) => setModelAId(e.target.value)}
              className="w-full bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              {allModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.modelId})
                </option>
              ))}
            </select>
          </div>

          {/* Selector B */}
          <div className="p-3 bg-slate-50 dark:bg-[#161f30] rounded-2xl border border-slate-200 dark:border-slate-800">
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
              Model B (Wajib)
            </label>
            <select
              value={modelB.id}
              onChange={(e) => setModelBId(e.target.value)}
              className="w-full bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              {allModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.modelId})
                </option>
              ))}
            </select>
          </div>

          {/* Selector C */}
          <div className="p-3 bg-slate-50 dark:bg-[#161f30] rounded-2xl border border-slate-200 dark:border-slate-800">
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
              Model C (Opsional)
            </label>
            <select
              value={modelCId}
              onChange={(e) => setModelCId(e.target.value)}
              className="w-full bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="">-- Kosongkan Model C --</option>
              {allModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.modelId})
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Responsive Technical Comparison Table (Section 12) */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            {/* Header Columns */}
            <thead className="bg-slate-50/80 dark:bg-[#161f30]/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-6 w-1/4">Spesifikasi</th>
                {activeModels.map((m, idx) => (
                  <th key={m.id} className="py-4 px-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-emerald-500 block">Model {idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}</span>
                      <Link href={`/models/${m.slug}`} className="font-extrabold text-sm text-slate-900 dark:text-white hover:text-emerald-500 transition-colors block">
                        {m.name}
                      </Link>
                      <span className="font-mono text-[10px] text-slate-400 block font-normal">{m.modelId}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300 font-medium">
              
              {/* Status */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Status</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    <ModelStatusBadge status={m.status} />
                  </td>
                ))}
              </tr>

              {/* Context Window */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Context Window</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6 font-mono font-semibold">
                    {formatContext(m.contextWindow)}
                  </td>
                ))}
              </tr>

              {/* Max Output */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Max Output</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6 font-mono font-semibold">
                    {formatContext(m.maxOutputTokens)}
                  </td>
                ))}
              </tr>

              {/* Input Price */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Input Price / 1M</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatPrice(m.inputPrice)}
                    {m.cachedInputPrice !== null && (
                      <span className="block text-[10px] text-slate-400 font-normal">
                        Cached: ${m.cachedInputPrice.toFixed(2)}/1M
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Output Price */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Output Price / 1M</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(m.outputPrice)}
                  </td>
                ))}
              </tr>

              {/* Reasoning */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Reasoning (Chain of Thought)</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    {m.reasoning ? (
                      <span className="text-purple-500 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Ya (Deep Thinking)
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Standar Non-o1
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Vision */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Vision (Input Gambar)</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    {m.vision ? (
                      <span className="text-blue-500 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Didukung
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Tidak
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Image Generation */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Image Generation</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    {m.imageGeneration ? (
                      <span className="text-amber-500 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Ya
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Tidak
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Audio Input / Output */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Audio (Suara)</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    {m.audioInput || m.audioOutput ? (
                      <span className="text-pink-500 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Didukung
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Tidak
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Function Calling */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Function Calling (Tools)</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    {m.functionCalling ? (
                      <span className="text-emerald-500 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Ya
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Tidak
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Structured Outputs */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Structured Outputs</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    {m.structuredOutputs ? (
                      <span className="text-cyan-500 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Ya (JSON Schema)
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Tidak
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Web Search */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Web Search</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    {m.webSearch ? (
                      <span className="text-emerald-500 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Ya
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Tidak
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* File Search */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">File Search</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    {m.fileSearch ? (
                      <span className="text-emerald-500 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Ya
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Tidak
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Computer Use */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Computer Use</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6">
                    {m.computerUse ? (
                      <span className="text-indigo-500 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Ya
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Tidak
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Knowledge Cutoff */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40">
                <td className="py-3.5 px-6 font-bold text-slate-400">Knowledge Cutoff</td>
                {activeModels.map((m) => (
                  <td key={m.id} className="py-3.5 px-6 text-slate-500 dark:text-slate-400">
                    {m.knowledgeCutoff}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Comparison: "Model X lebih cocok untuk..." (Section 13) */}
      <div className="bg-slate-50 dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-500 font-bold block mb-1">
            Ringkasan Praktis & Rekomendasi
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Kapan Anda Sebaiknya Memilih Masing-Masing Model?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pilihan bergantung pada keseimbangan antara kecepatan respon, ketajaman logika, modalitas gambar/suara, dan batas anggaran Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeModels.map((m, idx) => (
            <div 
              key={m.id} 
              className="p-5 rounded-2xl bg-white dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                    Model {idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}
                  </span>
                  <ModelStatusBadge status={m.status} />
                </div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                  {m.name} lebih cocok untuk:
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {m.suitableFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/models/${m.slug}`}
                  className="text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
                >
                  <span>Buka Halaman Spesifikasi {m.name}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
