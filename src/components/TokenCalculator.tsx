'use client';

import { useState } from 'react';
import { Model } from '@/types/model';
import { Calculator, DollarSign, Info, ShieldAlert, Layers, ArrowRightLeft, Percent, TrendingDown } from 'lucide-react';

interface TokenCalculatorProps {
  models: Model[];
  defaultModelId?: string;
}

const TOKEN_PRESETS = [
  { label: '1K', value: 1000 },
  { label: '10K', value: 10000 },
  { label: '100K', value: 100000 },
  { label: '1M', value: 1000000 },
  { label: '10M', value: 10000000 },
  { label: '100M', value: 100000000 },
];

export default function TokenCalculator({ models, defaultModelId = 'gpt-4o-mini' }: TokenCalculatorProps) {
  const [activeTab, setActiveTab] = useState<'single' | 'compare'>('single');

  // Single Calculator State
  const [selectedModelId, setSelectedModelId] = useState(defaultModelId);
  const [inputTokens, setInputTokens] = useState<number>(100000);
  const [cachedInputTokens, setCachedInputTokens] = useState<number>(0);
  const [outputTokens, setOutputTokens] = useState<number>(20000);
  const [useBatchMode, setUseBatchMode] = useState<boolean>(false);

  // Cost Comparison State
  const [compareModelAId, setCompareModelAId] = useState<string>('gpt-4o');
  const [compareModelBId, setCompareModelBId] = useState<string>('o3-mini');
  const [compareModelCId, setCompareModelCId] = useState<string>('gpt-4o-mini');
  const [compareTokensIn, setCompareTokensIn] = useState<number>(1000000);
  const [compareTokensOut, setCompareTokensOut] = useState<number>(200000);

  const currentModel = models.find(m => m.id === selectedModelId || m.slug === selectedModelId) || models[0];

  // Helper to compute cost for a model
  const calculateModelCost = (
    model: Model,
    inTok: number,
    cachedTok: number,
    outTok: number,
    batch: boolean
  ) => {
    if (model.inputPrice === null && model.outputPrice === null) {
      return { available: false, inputCost: null, cachedCost: null, outputCost: null, total: null };
    }

    const inPrice = model.inputPrice || 0;
    const cachedPrice = model.cachedInputPrice !== null && model.cachedInputPrice !== undefined ? model.cachedInputPrice : inPrice;
    const outPrice = model.outputPrice || 0;

    const discount = batch ? 0.5 : 1.0;

    const inputCost = (inTok / 1000000) * inPrice * discount;
    const cachedCost = (cachedTok / 1000000) * cachedPrice * discount;
    const outputCost = (outTok / 1000000) * outPrice * discount;
    const total = inputCost + cachedCost + outputCost;

    return {
      available: true,
      inputCost,
      cachedCost,
      outputCost,
      total
    };
  };

  const singleCost = calculateModelCost(currentModel, inputTokens, cachedInputTokens, outputTokens, useBatchMode);

  // Compare models calculations
  const modelA = models.find(m => m.id === compareModelAId) || models[0];
  const modelB = models.find(m => m.id === compareModelBId) || models[1] || models[0];
  const modelC = models.find(m => m.id === compareModelCId) || models[2] || models[0];

  const costA = calculateModelCost(modelA, compareTokensIn, 0, compareTokensOut, false);
  const costB = calculateModelCost(modelB, compareTokensIn, 0, compareTokensOut, false);
  const costC = calculateModelCost(modelC, compareTokensIn, 0, compareTokensOut, false);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Price & Token Cost Calculator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Formula resmi perhitungan tarif token OpenAI API berdasarkan volume input dan output.
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-[#161f30] p-1 border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'single'
                ? 'bg-white dark:bg-[#111827] text-emerald-500 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Kalkulator Model
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'compare'
                ? 'bg-white dark:bg-[#111827] text-emerald-500 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Compare Cost (3 Model)
          </button>
        </div>
      </div>

      {activeTab === 'single' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Model Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Pilih Model OpenAI
              </label>
              <select
                value={currentModel.id}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.modelId}) {m.inputPrice !== null ? `— $${m.inputPrice.toFixed(2)} in / $${m.outputPrice?.toFixed(2)} out` : '— (Pricing N/A)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Tokens */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Input Tokens:</span>
                <span className="font-mono text-emerald-500 font-bold">{inputTokens.toLocaleString('id-ID')} token</span>
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                value={inputTokens}
                onChange={(e) => setInputTokens(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              {/* Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Preset:</span>
                {TOKEN_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setInputTokens(p.value)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cached Input Tokens */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Cached Input Tokens (Diskon Prompt Caching):</span>
                <span className="font-mono text-teal-500 font-bold">{cachedInputTokens.toLocaleString('id-ID')} token</span>
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                value={cachedInputTokens}
                onChange={(e) => setCachedInputTokens(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Output Tokens */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Output Tokens:</span>
                <span className="font-mono text-blue-500 font-bold">{outputTokens.toLocaleString('id-ID')} token</span>
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              {/* Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Preset:</span>
                {TOKEN_PRESETS.slice(0, 4).map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setOutputTokens(p.value)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Batch API Option */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={useBatchMode}
                  onChange={(e) => setUseBatchMode(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-500 w-4 h-4 accent-emerald-500"
                />
                <span>Aktifkan Mode Batch API (Diskon 50% untuk SLA 24 jam)</span>
              </label>
            </div>
          </div>

          {/* Results Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-slate-50 dark:bg-[#161f30] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Ringkasan Estimasi Biaya
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {currentModel.name}
                </h3>
                <code className="text-[11px] font-mono text-emerald-500 font-bold">
                  {currentModel.modelId}
                </code>
              </div>

              {!singleCost.available ? (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium space-y-1">
                  <strong>Pricing belum tersedia.</strong>
                  <p className="text-[11px]">
                    Model ini belum memiliki data tarif publik resmi yang tercatat di database.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Input Cost:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      ${singleCost.inputCost?.toFixed(4)}
                    </span>
                  </div>

                  {cachedInputTokens > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Cached Input Cost:</span>
                      <span className="font-mono font-bold text-teal-500">
                        ${singleCost.cachedCost?.toFixed(4)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Output Cost:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      ${singleCost.outputCost?.toFixed(4)}
                    </span>
                  </div>

                  {useBatchMode && (
                    <div className="flex justify-between items-center text-emerald-500 font-bold text-[11px]">
                      <span>Diskon Batch API:</span>
                      <span>-50% Termasuk</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                      Total Estimasi:
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                        ${singleCost.total?.toFixed(4)}
                      </span>
                      <span className="block text-[11px] text-slate-400 font-medium">
                        ~ Rp {(singleCost.total! * 16000).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Formula Reference Box */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 space-y-1 font-mono">
              <span className="text-slate-500 font-bold block uppercase tracking-wider">Formula Baku:</span>
              <div>input_cost = (input_tokens / 1.000.000) × input_price</div>
              <div>cached_cost = (cached_tokens / 1.000.000) × cached_price</div>
              <div>output_cost = (output_tokens / 1.000.000) × output_price</div>
              <div className="text-emerald-500 font-bold">total = input_cost + cached_cost + output_cost</div>
            </div>
          </div>
        </div>
      ) : (
        /* Cost Comparison Mode */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Volume Input Tokens Bersama:
              </label>
              <input
                type="number"
                min="0"
                step="100000"
                value={compareTokensIn}
                onChange={(e) => setCompareTokensIn(Math.max(0, Number(e.target.value)))}
                className="w-full bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Volume Output Tokens Bersama:
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={compareTokensOut}
                onChange={(e) => setCompareTokensOut(Math.max(0, Number(e.target.value)))}
                className="w-full bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* 3 Model Cards Compare */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { m: modelA, cost: costA, setM: setCompareModelAId, label: 'Model A' },
              { m: modelB, cost: costB, setM: setCompareModelBId, label: 'Model B' },
              { m: modelC, cost: costC, setM: setCompareModelCId, label: 'Model C' }
            ].map(({ m, cost, setM, label }) => (
              <div key={label} className="p-5 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                  <select
                    value={m.id}
                    onChange={(e) => setM(e.target.value)}
                    className="w-full mt-1 bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
                  >
                    {models.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name} ({opt.modelId})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Tarif 1M In / Out:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      ${m.inputPrice?.toFixed(2) ?? 'N/A'} / ${m.outputPrice?.toFixed(2) ?? 'N/A'}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Estimasi Biaya:</span>
                    <span className="text-xl font-extrabold text-emerald-500 font-mono">
                      {cost.available ? `$${cost.total?.toFixed(4)}` : 'N/A'}
                    </span>
                  </div>

                  {cost.available && costA.available && costA.total! > 0 && m.id !== modelA.id && (
                    <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Perbandingan ke Model A:</span>
                      <span className="font-mono font-bold text-blue-500">
                        {cost.total! < costA.total!
                          ? `${(((costA.total! - cost.total!) / costA.total!) * 100).toFixed(1)}% Lebih Murah`
                          : `${(((cost.total! - costA.total!) / costA.total!) * 100).toFixed(1)}% Lebih Mahal`}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 italic">
                  Estimasi berdasarkan harga yang tersimpan.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p>
          <strong>Disclaimer:</strong> Perhitungan ini merupakan estimasi berdasarkan harga API yang tersimpan di website dan dapat berbeda dari tagihan aktual. Periksa pricing resmi OpenAI sebelum mengambil keputusan penggunaan API.
        </p>
      </div>
    </div>
  );
}
