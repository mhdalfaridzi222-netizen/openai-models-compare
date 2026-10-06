'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Model } from '@/types/model';
import ModelStatusBadge from '@/components/ModelStatusBadge';
import { 
  Check, 
  Sparkles, 
  Code, 
  Brain, 
  PenTool, 
  Image as ImageIcon, 
  Mic, 
  Zap, 
  Search, 
  ShieldCheck, 
  Coins, 
  Layers, 
  Eye,
  ArrowRight,
  Filter,
  RefreshCw,
  Info
} from 'lucide-react';

interface ModelFinderClientProps {
  allModels: Model[];
}

type UseCaseKey =
  | 'Coding'
  | 'Reasoning'
  | 'Writing'
  | 'Image'
  | 'Audio'
  | 'Realtime'
  | 'Embeddings'
  | 'Moderation'
  | 'Cost Efficiency'
  | 'Long Context'
  | 'Multimodal';

interface UseCaseOption {
  key: UseCaseKey;
  label: string;
  icon: any;
  desc: string;
}

const USE_CASES: UseCaseOption[] = [
  { key: 'Coding', label: 'Coding & Software Engineering', icon: Code, desc: 'Debugging, refactoring repositori, dan rekayasa kode' },
  { key: 'Reasoning', label: 'Reasoning & Deep Logic', icon: Brain, desc: 'Penalaran sains (STEM), matematika, dan problem solving bertahap' },
  { key: 'Writing', label: 'Writing & Copywriting', icon: PenTool, desc: 'Penulisan natural, ringkasan, dan kreasi konten panjang' },
  { key: 'Image', label: 'Image Understanding / Generation', icon: ImageIcon, desc: 'Input penglihatan (OCR, visual) dan kreasi gambar DALL·E' },
  { key: 'Audio', label: 'Audio & Speech', icon: Mic, desc: 'Transkripsi audio Whisper dan Text-to-Speech' },
  { key: 'Realtime', label: 'Realtime Voice (WebSocket)', icon: Zap, desc: 'Percakapan audio interaktif berlatensi sangat rendah' },
  { key: 'Embeddings', label: 'Embeddings & Semantic RAG', icon: Search, desc: 'Vektorisasi dokumen untuk mesin pencari semantik' },
  { key: 'Moderation', label: 'Moderasi & Filter Konten', icon: ShieldCheck, desc: 'Pendeteksian teks dan visual berisiko secara gratis' },
  { key: 'Cost Efficiency', label: 'Efisiensi Biaya / Hemat Anggaran', icon: Coins, desc: 'Tarif input < $1.00 per 1M token untuk volume besar' },
  { key: 'Long Context', label: 'Konteks Panjang (≥ 128k token)', icon: Layers, desc: 'Pemrosesan buku, dokumen hukum, dan repositori besar' },
  { key: 'Multimodal', label: 'Multimodal (Teks + Visual + Audio)', icon: Eye, desc: 'Mendukung pemrosesan lintas format secara simultan' },
];

export default function ModelFinderClient({ allModels }: ModelFinderClientProps) {
  const [selectedUseCases, setSelectedUseCases] = useState<UseCaseKey[]>(['Coding']);

  const toggleUseCase = (key: UseCaseKey) => {
    if (selectedUseCases.includes(key)) {
      if (selectedUseCases.length === 1) return; // Keep at least 1
      setSelectedUseCases(selectedUseCases.filter(k => k !== key));
    } else {
      setSelectedUseCases([...selectedUseCases, key]);
    }
  };

  const filteredModels = useMemo(() => {
    let result = [...allModels];

    for (const uc of selectedUseCases) {
      switch (uc) {
        case 'Coding':
          result = result.filter(m =>
            m.category === 'coding' ||
            m.modelId.includes('codex') ||
            m.modelId === 'o3-mini' ||
            m.modelId === 'o1' ||
            m.suitableFor.some(s => s.toLowerCase().includes('kod') || s.toLowerCase().includes('code'))
          );
          break;
        case 'Reasoning':
          result = result.filter(m => m.reasoning || m.category === 'reasoning');
          break;
        case 'Writing':
          result = result.filter(m =>
            m.category === 'flagship' ||
            m.suitableFor.some(s => s.toLowerCase().includes('tulis') || s.toLowerCase().includes('konten') || s.toLowerCase().includes('copywriting'))
          );
          break;
        case 'Image':
          result = result.filter(m => m.imageInput || m.imageGeneration || m.category === 'image' || m.vision);
          break;
        case 'Audio':
          result = result.filter(m => m.audioInput || m.audioOutput || m.category === 'audio');
          break;
        case 'Realtime':
          result = result.filter(m => m.category === 'realtime');
          break;
        case 'Embeddings':
          result = result.filter(m => m.category === 'embeddings');
          break;
        case 'Moderation':
          result = result.filter(m => m.category === 'moderation');
          break;
        case 'Cost Efficiency':
          result = result.filter(m => m.inputPrice !== null && m.inputPrice <= 1.10);
          break;
        case 'Long Context':
          result = result.filter(m => m.contextWindow !== null && m.contextWindow >= 128000);
          break;
        case 'Multimodal':
          result = result.filter(m => (m.vision || m.imageInput) && (m.category === 'flagship' || m.category === 'realtime'));
          break;
      }
    }

    // Sort order: if Cost Efficiency selected, sort by inputPrice ascending
    if (selectedUseCases.includes('Cost Efficiency')) {
      result.sort((a, b) => (a.inputPrice || 999) - (b.inputPrice || 999));
    } else if (selectedUseCases.includes('Long Context')) {
      result.sort((a, b) => (b.contextWindow || 0) - (a.contextWindow || 0));
    }

    return result;
  }, [allModels, selectedUseCases]);

  return (
    <div className="space-y-10">
      {/* Criteria Selection Box */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-500" />
              <span>Pilih Kriteria Penggunaan (Use Cases)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Klik untuk memilih satu atau beberapa parameter sekaligus:
            </p>
          </div>

          <button
            onClick={() => setSelectedUseCases(['Coding'])}
            className="self-start sm:self-auto text-xs text-slate-500 hover:text-emerald-500 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Kriteria</span>
          </button>
        </div>

        {/* Chips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {USE_CASES.map((uc) => {
            const isSelected = selectedUseCases.includes(uc.key);
            const Icon = uc.icon;
            return (
              <button
                key={uc.key}
                onClick={() => toggleUseCase(uc.key)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-[#161f30] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{uc.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1" />}
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">{uc.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Models matching your criteria
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ditemukan <span className="font-bold text-emerald-500">{filteredModels.length} model</span> yang memenuhi kombinasi kriteria teknis terpilih.
            </p>
          </div>
        </div>

        {/* Informative Disclaimer */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
          <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <p>
            <strong>Catatan Transparansi:</strong> Filter ini menggunakan algoritma deterministik berdasarkan data spesifikasi resmi (bukan tebakan probabilitas AI). Peringkat tidak menjamin performa mutlak untuk semua skenario spesifik.
          </p>
        </div>

        {filteredModels.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-4xl block">🔍</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Tidak Ada Model yang Cocok dengan Seluruh Kriteria
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Kombinasi kriteria yang Anda pilih terlalu spesifik (misal: menggabungkan Realtime Voice dan Embeddings secara bersamaan). Cobalah kurangi satu atau dua kriteria.
            </p>
            <button
              onClick={() => setSelectedUseCases(['Coding'])}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
            >
              Reset ke Kriteria Standar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredModels.map((m) => (
              <div
                key={m.id}
                className="bg-white dark:bg-[#111827] rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {m.name}
                      </h4>
                      <code className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {m.modelId}
                      </code>
                    </div>
                    <ModelStatusBadge status={m.status} />
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {m.shortDescription || m.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Konteks:</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {m.contextWindow ? `${(m.contextWindow / 1000).toFixed(0)}k token` : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Harga Input:</span>
                      <span className="font-mono font-bold text-emerald-500">
                        {m.inputPrice !== null ? `$${m.inputPrice.toFixed(2)} / 1M` : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/models/${m.slug}`}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Detail Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/compare?a=${m.id}&b=gpt-4o`}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-semibold"
                  >
                    Bandingkan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
