'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Model } from '@/types/model';
import ModelStatusBadge from '@/components/ModelStatusBadge';
import { Sparkles, ArrowRight, Code, PenTool, Brain, Image as ImageIcon, Mic, Bot, DollarSign, Zap } from 'lucide-react';

interface ModelSelectorProps {
  models: Model[];
}

export default function ModelSelector({ models }: ModelSelectorProps) {
  const [selectedGoal, setSelectedGoal] = useState<string>('coding');

  const goals = [
    { id: 'coding', label: 'Coding & Debugging', icon: <Code className="w-4 h-4" /> },
    { id: 'reasoning', label: 'Reasoning & STEM', icon: <Brain className="w-4 h-4" /> },
    { id: 'writing', label: 'Writing & Text', icon: <PenTool className="w-4 h-4" /> },
    { id: 'image', label: 'Image Generation', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'audio', label: 'Audio & Speech', icon: <Mic className="w-4 h-4" /> },
    { id: 'agent', label: 'Agentic Workflows', icon: <Bot className="w-4 h-4" /> },
    { id: 'cheap', label: 'Cost Efficient / Cheap', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'high-perf', label: 'High Performance', icon: <Zap className="w-4 h-4" /> },
  ];

  const getSuggestedModels = (): { primary: Model; alternatives: Model[]; rationale: string } => {
    switch (selectedGoal) {
      case 'coding':
        return {
          primary: models.find(m => m.id === 'o3-mini') || models[0],
          alternatives: models.filter(m => ['o1', 'gpt-4o', 'gpt-5-3-codex-spark'].includes(m.id)),
          rationale: 'o3-mini mencatatkan skor SWE-bench 78.3% dengan harga terjangkau ($1.10/1M token input). Alternatif o1 menyediakan penalaran visi multimodal untuk arsitektur visual.'
        };
      case 'reasoning':
        return {
          primary: models.find(m => m.id === 'o1') || models[0],
          alternatives: models.filter(m => ['o3-mini', 'o1-mini'].includes(m.id)),
          rationale: 'o1 adalah model penalaran terkuat di dunia dengan kemampuan multimodal penglihatan. o3-mini menjadi alternatif hemat biaya untuk matematika dan logika murni teks.'
        };
      case 'writing':
        return {
          primary: models.find(m => m.id === 'gpt-4o') || models[0],
          alternatives: models.filter(m => ['gpt-4o-mini', 'gpt-4-turbo'].includes(m.id)),
          rationale: 'GPT-4o menghasilkan teks dengan nuansa bahasa alami, gaya penulisan luwes, dan responsivitas cepat.'
        };
      case 'image':
        return {
          primary: models.find(m => m.id === 'dall-e-3') || models[0],
          alternatives: models.filter(m => ['dall-e-2'].includes(m.id)),
          rationale: 'DALL-E 3 adalah model resmi OpenAI untuk sintesis gambar resolusi tinggi dengan interpretasi instruksi teks yang sangat presisi.'
        };
      case 'audio':
        return {
          primary: models.find(m => m.id === 'whisper-1') || models[0],
          alternatives: models.filter(m => ['tts-1', 'tts-1-hd', 'gpt-4o-realtime-preview'].includes(m.id)),
          rationale: 'Whisper-1 adalah model standar industri untuk transkripsi audio multibahasa, sedangkan TTS-1 dan Realtime melayani sintesis suara langsung.'
        };
      case 'agent':
        return {
          primary: models.find(m => m.id === 'o3-mini') || models[0],
          alternatives: models.filter(m => ['gpt-4o', 'gpt-6-astra', 'gpt-5-3-codex-spark'].includes(m.id)),
          rationale: 'o3-mini mendukung Function Calling, Structured Outputs, dan verifikasi langkah mandiri yang krusial untuk agen otonom.'
        };
      case 'cheap':
        return {
          primary: models.find(m => m.id === 'gpt-4o-mini') || models[0],
          alternatives: models.filter(m => ['text-embedding-3-small', 'o3-mini'].includes(m.id)),
          rationale: 'GPT-4o mini adalah model teks multimodal termurah ($0.15/1M tk input) dengan performa melebihi GPT-3.5 Turbo.'
        };
      case 'high-perf':
      default:
        return {
          primary: models.find(m => m.id === 'o1') || models[0],
          alternatives: models.filter(m => ['gpt-4o', 'gpt-6-astra'].includes(m.id)),
          rationale: 'o1 dan GPT-4o memberikan tingkat kecerdasan tertinggi di kelasnya untuk problem solving tanpa kompromi.'
        };
    }
  };

  const { primary, alternatives, rationale } = getSuggestedModels();

  return (
    <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Selector</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Model apa yang Anda butuhkan?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Pilih fokus pekerjaan Anda untuk melihat model yang dapat dipertimbangkan.
        </p>
      </div>

      {/* Goal Selector Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {goals.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGoal(g.id)}
            className={`p-3 rounded-2xl text-left border text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedGoal === g.id
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
            }`}
          >
            <span>{g.icon}</span>
            <span>{g.label}</span>
          </button>
        ))}
      </div>

      {/* Results Box */}
      <div className="bg-[#161f30] p-6 rounded-2xl border border-slate-700/80 space-y-4">
        <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
          Model yang dapat dipertimbangkan berdasarkan kriteria yang dipilih:
        </span>

        {/* Primary Recommended */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/80 border border-emerald-500/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-extrabold text-emerald-400">Pilihan Utama</span>
              <ModelStatusBadge status={primary.status} />
            </div>
            <h3 className="text-lg font-extrabold text-white">
              {primary.name} <span className="font-mono text-xs text-slate-400 font-normal">({primary.modelId})</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {rationale}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/models/${primary.slug}`}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow"
            >
              <span>Lihat Detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Alternative Models */}
        {alternatives.length > 0 && (
          <div>
            <span className="text-xs text-slate-400 block mb-2 font-medium">Opsi Alternatif Terkait:</span>
            <div className="flex flex-wrap gap-2">
              {alternatives.map((alt) => (
                <Link
                  key={alt.id}
                  href={`/models/${alt.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <span>{alt.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({alt.modelId})</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mandatory Neutral Disclaimer (Section 14) */}
        <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-700/60 leading-relaxed italic">
          *Informasi ini merupakan model yang dapat dipertimbangkan berdasarkan kriteria teknis yang Anda pilih, dan bukan merupakan rekomendasi investasi atau jaminan performa mutlak.
        </p>
      </div>

    </div>
  );
}
