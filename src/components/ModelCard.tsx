'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Model } from '@/types/model';
import ModelStatusBadge from '@/components/ModelStatusBadge';
import { ArrowRight, Copy, Check, Scale, Eye, Zap, Brain, Code } from 'lucide-react';

interface ModelCardProps {
  model: Model;
}

export default function ModelCard({ model }: ModelCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(model.modelId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatPrice = (p: number | null) => {
    if (p === null || p === undefined) return 'Belum tersedia';
    if (p === 0) return 'Gratis';
    return `$${p.toFixed(2)} / 1M`;
  };

  const formatContext = (c: number | null) => {
    if (c === null || c === undefined) return 'N/A';
    if (c >= 1000000) return `${(c / 1000000).toFixed(2)}M`;
    return `${(c / 1000).toFixed(0)}K`;
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
      <div>
        
        {/* Top: Status & Copy ID */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <ModelStatusBadge status={model.status} />

          {/* Code Style Model ID */}
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-500/10 hover:text-emerald-500 text-[11px] font-mono font-medium text-slate-600 dark:text-slate-300 transition-colors"
            title="Klik untuk menyalin Model ID"
          >
            <span>{model.modelId}</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-500" />
            ) : (
              <Copy className="w-3 h-3 text-slate-400 group-hover:text-emerald-500" />
            )}
          </button>
        </div>

        {/* Name & Family */}
        <div className="mb-2">
          <Link href={`/models/${model.slug}`} className="block">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
              {model.name}
            </h3>
          </Link>
          <span className="text-xs text-slate-400 font-medium block mt-0.5">
            Keluarga {model.family} • Kategori {model.category}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-4">
          {model.shortDescription || model.description}
        </p>

        {/* Capabilities Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5 text-[11px]">
          {model.reasoning && (
            <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-500 border border-purple-500/20 font-semibold flex items-center gap-1">
              <Brain className="w-3 h-3" />
              <span>Reasoning</span>
            </span>
          )}
          {model.vision && (
            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20 font-semibold flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Vision</span>
            </span>
          )}
          {model.functionCalling && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
              Tools / Functions
            </span>
          )}
          {model.structuredOutputs && (
            <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-medium">
              JSON Schema
            </span>
          )}
        </div>

        {/* Specs Box */}
        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200/80 dark:border-slate-800 mb-5 text-center">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Context</span>
            <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-100">
              {formatContext(model.contextWindow)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Input</span>
            <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
              {formatPrice(model.inputPrice)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Output</span>
            <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
              {formatPrice(model.outputPrice)}
            </span>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
        <Link
          href={`/models/${model.slug}`}
          className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Lihat Detail</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href={`/compare?a=${model.id}`}
          className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 font-bold text-xs text-center border border-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Bandingkan</span>
        </Link>
      </div>

    </div>
  );
}
