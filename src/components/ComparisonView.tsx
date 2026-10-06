'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  RefreshCw,
  HelpCircle,
  Minus,
  Sparkles,
  Zap,
  TrendingDown,
  Maximize2
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
  const router = useRouter();
  const [modelAId, setModelAId] = useState(initialModelA);
  const [modelBId, setModelBId] = useState(initialModelB);
  const [modelCId, setModelCId] = useState<string>(initialModelC || '');
  const [hasModelC, setHasModelC] = useState<boolean>(Boolean(initialModelC));
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initialModelA) setModelAId(initialModelA);
    if (initialModelB) setModelBId(initialModelB);
    if (initialModelC) {
      setModelCId(initialModelC);
      setHasModelC(true);
    } else {
      setHasModelC(false);
    }
  }, [initialModelA, initialModelB, initialModelC]);

  const modelA = allModels.find(m => m.id === modelAId || m.slug === modelAId || m.modelId === modelAId) || allModels[0];
  const modelB = allModels.find(m => m.id === modelBId || m.slug === modelBId || m.modelId === modelBId) || allModels[1] || allModels[0];
  const modelC = hasModelC && modelCId
    ? (allModels.find(m => m.id === modelCId || m.slug === modelCId || m.modelId === modelCId) || null)
    : null;

  const activeModels = [modelA, modelB, modelC].filter(Boolean) as Model[];

  const formatPrice = (p: number | null | undefined) => {
    if (p === null || p === undefined) return 'Pricing belum tersedia';
    if (p === 0) return 'Gratis';
    return `$${p.toFixed(2)} / 1M token`;
  };

  const formatContext = (c: number | null | undefined) => {
    if (c === null || c === undefined) return 'N/A';
    return `${c.toLocaleString('id-ID')} token`;
  };

  // Generate canonical comparison URL
  const generateComparisonSlug = () => {
    if (modelC) {
      return `/compare/${modelA.slug}-vs-${modelB.slug}-vs-${modelC.slug}`;
    }
    return `/compare/${modelA.slug}-vs-${modelB.slug}`;
  };

  const handleShare = () => {
    const slugUrl = window.location.origin + generateComparisonSlug();
    navigator.clipboard.writeText(slugUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  // Highlights Calculation
  const maxContextModel = [...activeModels].sort((a, b) => (b.contextWindow || 0) - (a.contextWindow || 0))[0];

  const modelsWithInputPrice = activeModels.filter(m => m.inputPrice !== null && m.inputPrice !== undefined);
  const lowestInputModel = modelsWithInputPrice.length > 0
    ? [...modelsWithInputPrice].sort((a, b) => (a.inputPrice || 0) - (b.inputPrice || 0))[0]
    : null;

  const modelsWithOutputPrice = activeModels.filter(m => m.outputPrice !== null && m.outputPrice !== undefined);
  const lowestOutputModel = modelsWithOutputPrice.length > 0
    ? [...modelsWithOutputPrice].sort((a, b) => (a.outputPrice || 0) - (b.outputPrice || 0))[0]
    : null;

  const renderCapCell = (supported: boolean | undefined, label?: string) => {
    if (supported === true) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold">
          <Check className="w-3.5 h-3.5" />
          <span>{label || 'Didukung'}</span>
        </span>
      );
    }
    if (supported === false) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-medium">
          <Minus className="w-3.5 h-3.5" />
          <span>Tidak didukung</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-medium">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Tidak diketahui</span>
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Model Selection Bar */}
      <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">
              Konfigurasi Pembanding Multi-Model
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Bandingkan 2 atau 3 Model OpenAI
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (hasModelC) {
                  setHasModelC(false);
                } else {
                  setHasModelC(true);
                  if (!modelCId) setModelCId(allModels[2]?.id || allModels[0]?.id);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <span>{hasModelC ? '— Kurangi Jadi 2 Model' : '+ Tambah Model ke-3'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              {copiedLink ? <CheckCheck className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan URL'}</span>
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${hasModelC ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
          {/* Selector A */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#161f30] rounded-2xl border border-slate-200 dark:border-slate-800">
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
          <div className="p-3.5 bg-slate-50 dark:bg-[#161f30] rounded-2xl border border-slate-200 dark:border-slate-800">
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
          {hasModelC && (
            <div className="p-3.5 bg-slate-50 dark:bg-[#161f30] rounded-2xl border border-slate-200 dark:border-slate-800">
              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Model C (Opsional)
              </label>
              <select
                value={modelC?.id || ''}
                onChange={(e) => setModelCId(e.target.value)}
                className="w-full bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                {allModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.modelId})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {maxContextModel && (
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500">
              <Maximize2 className="w-4 h-4" />
              <span>Context Window Terbesar</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              {maxContextModel.name}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Context window terbesar dari model yang dibandingkan ({formatContext(maxContextModel.contextWindow)}).
            </p>
          </div>
        )}

        {lowestInputModel && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
              <TrendingDown className="w-4 h-4" />
              <span>Harga Input Termurah</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              {lowestInputModel.name}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Terendah berdasarkan harga input yang tercatat ({formatPrice(lowestInputModel.inputPrice)}).
            </p>
          </div>
        )}

        {lowestOutputModel && (
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500">
              <Sparkles className="w-4 h-4" />
              <span>Harga Output Termurah</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              {lowestOutputModel.name}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Terendah berdasarkan harga output yang tercatat ({formatPrice(lowestOutputModel.outputPrice)}).
            </p>
          </div>
        )}
      </div>

      {/* Main Side-by-Side Comparison Matrix */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-[#161f30]">
              <th className="p-4 sm:p-5 text-xs font-extrabold text-slate-400 uppercase tracking-wider w-1/4">
                Parameter & Spesifikasi
              </th>
              {activeModels.map((m) => (
                <th key={m.id} className="p-4 sm:p-5 w-1/3">
                  <div className="space-y-1">
                    <Link
                      href={`/models/${m.slug}`}
                      className="text-base font-extrabold text-slate-900 dark:text-white hover:text-emerald-500 transition-colors inline-block"
                    >
                      {m.name}
                    </Link>
                    <div className="flex items-center gap-2">
                      <code className="text-[11px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">
                        {m.modelId}
                      </code>
                      <ModelStatusBadge status={m.status} />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {/* Context Window */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Context Window
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5 font-mono font-bold text-slate-900 dark:text-white">
                  {formatContext(m.contextWindow)}
                </td>
              ))}
            </tr>

            {/* Max Output Tokens */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Max Output Tokens
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5 font-mono text-slate-800 dark:text-slate-200">
                  {m.maxOutputTokens ? `${m.maxOutputTokens.toLocaleString('id-ID')} token` : 'N/A'}
                </td>
              ))}
            </tr>

            {/* Input Price */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Tarif Input / 1M Token
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {formatPrice(m.inputPrice)}
                </td>
              ))}
            </tr>

            {/* Cached Input Price */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Cached Input / 1M Token
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5 font-mono text-slate-800 dark:text-slate-200">
                  {formatPrice(m.cachedInputPrice)}
                </td>
              ))}
            </tr>

            {/* Output Price */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Tarif Output / 1M Token
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5 font-mono font-bold text-blue-600 dark:text-blue-400">
                  {formatPrice(m.outputPrice)}
                </td>
              ))}
            </tr>

            {/* Reasoning Capability */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Reasoning (Chain of Thought)
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.reasoning, 'Deep Reasoning')}
                </td>
              ))}
            </tr>

            {/* Vision Capability */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Vision (Input Gambar)
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.vision || m.imageInput, 'Input Gambar Aktif')}
                </td>
              ))}
            </tr>

            {/* Image Generation */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Image Generation
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.imageGeneration, 'Generasi Gambar')}
                </td>
              ))}
            </tr>

            {/* Audio Capability */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Audio & Speech
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.audioInput || m.audioOutput, 'Audio')}
                </td>
              ))}
            </tr>

            {/* Realtime WebSocket */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Realtime Voice (WebSocket)
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.category === 'realtime', 'Realtime Voice')}
                </td>
              ))}
            </tr>

            {/* Function Calling */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Function Calling (Tools)
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.functionCalling)}
                </td>
              ))}
            </tr>

            {/* Structured Outputs */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Structured Outputs (Strict JSON)
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.structuredOutputs)}
                </td>
              ))}
            </tr>

            {/* Web Search */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Web Search
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.webSearch)}
                </td>
              ))}
            </tr>

            {/* File Search */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                File Search
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.fileSearch)}
                </td>
              ))}
            </tr>

            {/* Computer Use */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Computer Use
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  {renderCapCell(m.computerUse)}
                </td>
              ))}
            </tr>

            {/* Knowledge Cutoff */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Knowledge Cutoff
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5 text-slate-700 dark:text-slate-300">
                  {m.knowledgeCutoff}
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/20">
                Detail Lengkap
              </td>
              {activeModels.map((m) => (
                <td key={m.id} className="p-4 sm:p-5">
                  <Link
                    href={`/models/${m.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
                  >
                    <span>Buka Halaman Spesifikasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
