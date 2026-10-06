'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Model } from '@/types/model';
import {
  Coins,
  Search,
  ExternalLink,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  History,
  ArrowRight
} from 'lucide-react';

interface Props {
  initialModels: Model[];
}

export default function AdminPricingClient({ initialModels }: Props) {
  const [models, setModels] = useState<Model[]>(initialModels);
  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [newInputPrice, setNewInputPrice] = useState<number | string>('');
  const [newCachedPrice, setNewCachedPrice] = useState<number | string>('');
  const [newOutputPrice, setNewOutputPrice] = useState<number | string>('');
  const [sourceUrl, setSourceUrl] = useState('https://openai.com/api/pricing/');
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = models.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.modelId.toLowerCase().includes(search.toLowerCase())
  );

  const openEditModal = (m: Model) => {
    setSelectedModel(m);
    setNewInputPrice(m.inputPrice !== null ? m.inputPrice : '');
    setNewCachedPrice(m.cachedInputPrice !== null ? m.cachedInputPrice : '');
    setNewOutputPrice(m.outputPrice !== null ? m.outputPrice : '');
    setSourceUrl(m.officialUrl || 'https://openai.com/api/pricing/');
  };

  const handleSavePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModel) return;

    setSaving(true);
    const updated = {
      ...selectedModel,
      inputPrice: newInputPrice !== '' ? Number(newInputPrice) : null,
      cachedInputPrice: newCachedPrice !== '' ? Number(newCachedPrice) : null,
      outputPrice: newOutputPrice !== '' ? Number(newOutputPrice) : null,
      batchInputPrice: newInputPrice !== '' ? Number(newInputPrice) * 0.5 : null,
      batchOutputPrice: newOutputPrice !== '' ? Number(newOutputPrice) * 0.5 : null,
      lastVerifiedAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: updated, adminEmail: 'admin@alfaridzi.dev' })
      });

      if (res.ok) {
        setModels(prev => prev.map(m => m.id === selectedModel.id ? updated : m));
        setNotification(`Tarif untuk model ${selectedModel.name} berhasil diperbarui dengan periode baru.`);
        setSelectedModel(null);
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      // fallback
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Coins className="w-6 h-6 text-emerald-500" />
            <span>Manajemen Tarif Token & Histori (Section 11 & 12)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pengelolaan tarif API per 1M token berbasis periode tanggal (effective_from & effective_until) tanpa menimpa histori masa lalu.
          </p>
        </div>

        <Link
          href="/admin/sync"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
        >
          <span>Sinkronisasi Otomatis Tarif</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari model..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Mata Uang Standar: <strong className="text-slate-900 dark:text-white">USD ($) per 1M Token</strong>
        </span>
      </div>

      {/* Pricing Table */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-4">Nama Model</th>
                <th className="py-4 px-4 font-mono">Model ID</th>
                <th className="py-4 px-4">Input / 1M</th>
                <th className="py-4 px-4">Cached Input / 1M</th>
                <th className="py-4 px-4">Output / 1M</th>
                <th className="py-4 px-4">Batch (50%)</th>
                <th className="py-4 px-4">Terakhir Diverifikasi</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                    {m.name}
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-400">{m.modelId}</td>
                  <td className="py-4 px-4 font-mono font-bold text-emerald-500">
                    {m.inputPrice !== null ? `$${m.inputPrice.toFixed(2)}` : <span className="text-slate-400 font-normal">N/A</span>}
                  </td>
                  <td className="py-4 px-4 font-mono text-teal-500">
                    {m.cachedInputPrice !== null ? `$${m.cachedInputPrice.toFixed(2)}` : <span className="text-slate-400 font-normal">N/A</span>}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-blue-500">
                    {m.outputPrice !== null ? `$${m.outputPrice.toFixed(2)}` : <span className="text-slate-400 font-normal">N/A</span>}
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-400">
                    {m.inputPrice !== null ? `$${(m.inputPrice * 0.5).toFixed(2)} / $${((m.outputPrice || 0) * 0.5).toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="py-4 px-4 text-slate-400 text-[11px]">
                    {m.lastVerifiedAt ? new Date(m.lastVerifiedAt).toLocaleDateString('id-ID') : '6 Oktober 2026'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => openEditModal(m)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 ml-auto"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Ubah Tarif</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedModel && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Perbarui Tarif: {selectedModel.name}
            </h3>
            <p className="text-xs text-slate-500">
              Sistem akan menandai tarif lama sebagai riwayat lampau dan memberlakukan nilai baru mulai hari ini.
            </p>

            <form onSubmit={handleSavePrice} className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Input Price ($ / 1M)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={newInputPrice}
                  onChange={(e) => setNewInputPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Cached Input Price ($ / 1M)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={newCachedPrice}
                  onChange={(e) => setNewCachedPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Output Price ($ / 1M)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={newOutputPrice}
                  onChange={(e) => setNewOutputPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Sumber URL Resmi
                </label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedModel(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  {saving ? 'Menyimpan...' : 'Simpan & Terapkan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
