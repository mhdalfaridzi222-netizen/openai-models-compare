'use client';

import { useState } from 'react';
import { Model } from '@/types/model';
import { Calculator, DollarSign, Info, ShieldAlert } from 'lucide-react';

interface TokenCalculatorProps {
  models: Model[];
  defaultModelId?: string;
}

export default function TokenCalculator({ models, defaultModelId = 'gpt-4o-mini' }: TokenCalculatorProps) {
  // Only LLM models with pricing
  const billableModels = models.filter(m => m.inputPrice !== null && m.outputPrice !== null && m.outputPrice > 0);

  const [selectedModelId, setSelectedModelId] = useState(defaultModelId);
  const [inputTokens, setInputTokens] = useState<number>(1000);
  const [outputTokens, setOutputTokens] = useState<number>(500);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(1000);
  const [usePromptCaching, setUsePromptCaching] = useState<boolean>(true);
  const [useBatchApi, setUseBatchApi] = useState<boolean>(false);

  const currentModel = billableModels.find(m => m.id === selectedModelId) || billableModels[0];

  // Calculation
  const monthlyRequests = requestsPerDay * 30;
  const totalInputTokensMonthly = inputTokens * monthlyRequests;
  const totalOutputTokensMonthly = outputTokens * monthlyRequests;

  const effectiveInputPrice = usePromptCaching && currentModel.cachedInputPrice !== null
    ? currentModel.cachedInputPrice
    : (currentModel.inputPrice || 0);

  const rawInputCostUsd = (totalInputTokensMonthly / 1000000) * effectiveInputPrice;
  const rawOutputCostUsd = (totalOutputTokensMonthly / 1000000) * (currentModel.outputPrice || 0);
  
  const discountMultiplier = useBatchApi ? 0.5 : 1.0;
  const finalInputCost = rawInputCostUsd * discountMultiplier;
  const finalOutputCost = rawOutputCostUsd * discountMultiplier;
  const totalCostUsd = finalInputCost + finalOutputCost;
  const totalCostIdr = totalCostUsd * 16000;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Token Cost Calculator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hitung estimasi pengeluaran bulanan berdasarkan input, output, dan model OpenAI yang dipilih.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
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
              {billableModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (${m.inputPrice?.toFixed(2)} in / ${m.outputPrice?.toFixed(2)} out)
                </option>
              ))}
            </select>
          </div>

          {/* Input Tokens */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Rata-rata Input Token per Panggilan:</span>
              <span className="font-mono text-emerald-500 font-bold">{inputTokens.toLocaleString('id-ID')} tk</span>
            </div>
            <input
              type="range"
              min="100"
              max="30000"
              step="100"
              value={inputTokens}
              onChange={(e) => setInputTokens(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">Kira-kira ~{Math.round(inputTokens * 0.75)} kata dokumen / prompt instruksi</span>
          </div>

          {/* Output Tokens */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Rata-rata Output Token per Panggilan:</span>
              <span className="font-mono text-blue-500 font-bold">{outputTokens.toLocaleString('id-ID')} tk</span>
            </div>
            <input
              type="range"
              min="50"
              max="8000"
              step="50"
              value={outputTokens}
              onChange={(e) => setOutputTokens(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">Kira-kira ~{Math.round(outputTokens * 0.75)} kata respon yang dihasilkan model</span>
          </div>

          {/* Requests per day */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Volume Permintaan per Hari:</span>
              <span className="font-mono text-purple-500 font-bold">{requestsPerDay.toLocaleString('id-ID')} req/hari</span>
            </div>
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={requestsPerDay}
              onChange={(e) => setRequestsPerDay(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">Setara {monthlyRequests.toLocaleString('id-ID')} panggilan API per bulan</span>
          </div>

          {/* Caching & Batch Toggles */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
            <label className="flex items-center justify-between cursor-pointer text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Gunakan Prompt Caching (Diskon 50% Input)
              </span>
              <input
                type="checkbox"
                checked={usePromptCaching}
                onChange={(e) => setUsePromptCaching(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Gunakan Batch API (Diskon Flat 50% Semua Token)
              </span>
              <input
                type="checkbox"
                checked={useBatchApi}
                onChange={(e) => setUseBatchApi(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
              />
            </label>
          </div>

        </div>

        {/* Calculation Output Box (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#161f30] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Rincian Estimasi Biaya
            </span>

            <div className="space-y-3 divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Model Dipilih:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{currentModel.name}</span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-slate-500">Estimasi Input Cost:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">${finalInputCost.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-slate-500">Estimasi Output Cost:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">${finalOutputCost.toFixed(2)}</span>
              </div>

              {useBatchApi && (
                <div className="flex justify-between pt-2 text-emerald-500 font-medium">
                  <span>Diskon Batch API:</span>
                  <span>-50% Termasuk</span>
                </div>
              )}

              <div className="pt-3">
                <span className="text-[11px] text-slate-400 block font-semibold">Total Estimasi per Bulan:</span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  ${totalCostUsd.toFixed(2)}
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block mt-1">
                  ≈ Rp {Math.round(totalCostIdr).toLocaleString('id-ID')} (Kurs Rp 16.000)
                </span>
              </div>

            </div>
          </div>

          {/* Section 22 Mandatory Disclaimer */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Perhatian:</strong> Ini hanya estimasi berdasarkan harga yang tersimpan dan belum memperhitungkan seluruh kemungkinan biaya penggunaan API (seperti kuota panggilan gambar, audio, atau overhead penunjang). Bukan merupakan tagihan resmi.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
