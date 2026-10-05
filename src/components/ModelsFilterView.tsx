'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Model, ModelCategory, ModelStatus } from '@/types/model';
import ModelCard from '@/components/ModelCard';
import { Search, SlidersHorizontal, RotateCcw, Filter } from 'lucide-react';

interface Props {
  initialModels: Model[];
}

export default function ModelsFilterView({ initialModels }: Props) {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [filterReasoning, setFilterReasoning] = useState<string>('all');
  const [filterVision, setFilterVision] = useState<string>('all');
  const [filterImage, setFilterImage] = useState<string>('all');
  const [filterAudio, setFilterAudio] = useState<string>('all');
  const [filterContext, setFilterContext] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync if URL search params change
  useEffect(() => {
    if (urlSearch) setQuery(urlSearch);
    if (urlCategory && urlCategory !== 'all') setSelectedCategory(urlCategory);
  }, [urlSearch, urlCategory]);

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setFilterReasoning('all');
    setFilterVision('all');
    setFilterImage('all');
    setFilterAudio('all');
    setFilterContext('all');
    setFilterPrice('all');
    setSortBy('newest');
  };

  const filteredModels = useMemo(() => {
    return initialModels
      .filter((m) => {
        // Search
        if (query.trim()) {
          const q = query.toLowerCase().trim();
          const match =
            m.name.toLowerCase().includes(q) ||
            m.modelId.toLowerCase().includes(q) ||
            m.category.toLowerCase().includes(q) ||
            m.family.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.shortDescription.toLowerCase().includes(q);
          if (!match) return false;
        }

        // Category
        if (selectedCategory !== 'all' && m.category !== selectedCategory) {
          return false;
        }

        // Status
        if (selectedStatus !== 'all' && m.status !== selectedStatus) {
          return false;
        }

        // Capabilities
        if (filterReasoning === 'yes' && !m.reasoning) return false;
        if (filterReasoning === 'no' && m.reasoning) return false;

        if (filterVision === 'yes' && !m.vision) return false;
        if (filterVision === 'no' && m.vision) return false;

        if (filterImage === 'yes' && !m.imageGeneration) return false;
        if (filterImage === 'no' && m.imageGeneration) return false;

        if (filterAudio === 'yes' && !m.audioInput && !m.audioOutput) return false;
        if (filterAudio === 'no' && (m.audioInput || m.audioOutput)) return false;

        // Context Window
        if (filterContext === 'large' && (m.contextWindow === null || m.contextWindow < 200000)) return false;
        if (filterContext === 'medium' && (m.contextWindow === null || m.contextWindow < 128000 || m.contextWindow >= 200000)) return false;
        if (filterContext === 'small' && (m.contextWindow !== null && m.contextWindow >= 128000)) return false;

        // Price Range (Input)
        if (filterPrice === 'free' && m.inputPrice !== 0) return false;
        if (filterPrice === 'cheap' && (m.inputPrice === null || m.inputPrice > 1.0)) return false;
        if (filterPrice === 'mid' && (m.inputPrice === null || m.inputPrice <= 1.0 || m.inputPrice > 5.0)) return false;
        if (filterPrice === 'premium' && (m.inputPrice === null || m.inputPrice <= 5.0)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.releaseDate || '').localeCompare(a.releaseDate || '');
        if (sortBy === 'oldest') return (a.releaseDate || '').localeCompare(b.releaseDate || '');
        if (sortBy === 'price-low') {
          return (a.inputPrice ?? 999) - (b.inputPrice ?? 999);
        }
        if (sortBy === 'price-high') {
          return (b.inputPrice ?? -1) - (a.inputPrice ?? -1);
        }
        if (sortBy === 'context-largest') {
          return (b.contextWindow ?? 0) - (a.contextWindow ?? 0);
        }
        return 0;
      });
  }, [
    initialModels,
    query,
    selectedCategory,
    selectedStatus,
    filterReasoning,
    filterVision,
    filterImage,
    filterAudio,
    filterContext,
    filterPrice,
    sortBy,
  ]);

  return (
    <div className="space-y-6">
      
      {/* Top Search & Filter Bar */}
      <div className="bg-white dark:bg-[#111827] p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama model, modelId, kategori, atau deskripsi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Toggle Filter Button & Sort */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-emerald-500 transition-colors flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter Lanjutan</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="newest">Urutan: Terbaru</option>
              <option value="oldest">Urutan: Terlama</option>
              <option value="price-low">Harga: Termurah</option>
              <option value="price-high">Harga: Tertinggi</option>
              <option value="context-largest">Context: Terbesar</option>
            </select>

            <button
              onClick={resetFilters}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
              title="Reset Semua Filter"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Quick Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'Semua Kategori' },
            { id: 'flagship', label: '⚡ Flagship' },
            { id: 'reasoning', label: '🧠 Reasoning' },
            { id: 'coding', label: '💻 Coding' },
            { id: 'image', label: '🎨 Image' },
            { id: 'audio', label: '🎙️ Audio' },
            { id: 'realtime', label: '⚡ Realtime' },
            { id: 'embeddings', label: '🔎 Embeddings' },
            { id: 'moderation', label: '🛡️ Moderation' },
            { id: 'open-weight', label: '📦 Open-weight' },
            { id: 'deprecated', label: '⏳ Deprecated' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-[#161f30] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Advanced Filters Expandable Drawer (Section 15) */}
        {isFilterOpen && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            
            {/* Status Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
              >
                <option value="all">Semua Status</option>
                <option value="ACTIVE">🟢 Active</option>
                <option value="PREVIEW">🟡 Preview</option>
                <option value="DEPRECATED">🟠 Deprecated</option>
                <option value="RETIRED">🔴 Retired</option>
              </select>
            </div>

            {/* Reasoning Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Reasoning (o-series)</label>
              <select
                value={filterReasoning}
                onChange={(e) => setFilterReasoning(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
              >
                <option value="all">Semua</option>
                <option value="yes">Hanya Reasoning</option>
                <option value="no">Non-Reasoning</option>
              </select>
            </div>

            {/* Vision Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Vision Input</label>
              <select
                value={filterVision}
                onChange={(e) => setFilterVision(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
              >
                <option value="all">Semua</option>
                <option value="yes">Mendukung Visi</option>
                <option value="no">Tanpa Visi</option>
              </select>
            </div>

            {/* Audio Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Audio / Suara</label>
              <select
                value={filterAudio}
                onChange={(e) => setFilterAudio(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
              >
                <option value="all">Semua</option>
                <option value="yes">Mendukung Audio</option>
                <option value="no">Tanpa Audio</option>
              </select>
            </div>

            {/* Context Window */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Context Window</label>
              <select
                value={filterContext}
                onChange={(e) => setFilterContext(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
              >
                <option value="all">Semua Ukuran</option>
                <option value="large">≥ 200k token</option>
                <option value="medium">128k - 200k token</option>
                <option value="small">&lt; 128k token</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Rentang Harga Input</label>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
              >
                <option value="all">Semua Harga</option>
                <option value="free">Gratis ($0.00)</option>
                <option value="cheap">&le; $1.00 / 1M</option>
                <option value="mid">$1.00 - $5.00 / 1M</option>
                <option value="premium">&gt; $5.00 / 1M</option>
              </select>
            </div>

          </div>
        )}

      </div>

      {/* Result Count and Active Filters Notice */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Menampilkan <strong>{filteredModels.length}</strong> model yang cocok</span>
        {(query || selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <button
            onClick={resetFilters}
            className="text-emerald-500 hover:underline font-semibold"
          >
            Hapus Semua Filter
          </button>
        )}
      </div>

      {/* Models Grid */}
      {filteredModels.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <p className="text-base font-bold text-slate-800 dark:text-slate-200">
            Tidak ada model yang cocok dengan kriteria filter Anda.
          </p>
          <p className="text-xs text-slate-500">
            Coba reset filter atau gunakan kata kunci pencarian yang lebih umum.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow mt-2"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      )}

    </div>
  );
}
