'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Model, ModelStatus } from '@/types/model';
import ModelStatusBadge from '@/components/ModelStatusBadge';
import {
  History,
  AlertTriangle,
  ArrowRight,
  Edit3,
  CheckCircle2,
  ExternalLink,
  Search
} from 'lucide-react';

interface Props {
  initialModels: Model[];
}

export default function AdminDeprecationsClient({ initialModels }: Props) {
  const [models, setModels] = useState<Model[]>(initialModels);
  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [newStatus, setNewStatus] = useState<ModelStatus>('DEPRECATED');
  const [deprecatedDate, setDeprecatedDate] = useState('');
  const [shutdownDate, setShutdownDate] = useState('');
  const [replacementModel, setReplacementModel] = useState('');
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = models.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.modelId.toLowerCase().includes(search.toLowerCase())
  );

  const openDeprecationModal = (m: Model) => {
    setSelectedModel(m);
    setNewStatus(m.status === 'RETIRED' ? 'RETIRED' : 'DEPRECATED');
    setDeprecatedDate(m.deprecatedDate || new Date().toISOString().split('T')[0]);
    setShutdownDate(m.shutdownDate || '');
    setReplacementModel(m.recommendedReplacement || 'gpt-4o-mini');
  };

  const handleSaveDeprecation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModel) return;

    setSaving(true);
    const updated = {
      ...selectedModel,
      status: newStatus,
      deprecatedDate: deprecatedDate || null,
      shutdownDate: shutdownDate || null,
      recommendedReplacement: replacementModel || null,
      lastVerifiedAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: updated, adminEmail: 'admin@alfaridzi.dev' })
      });

      if (res.ok) {
        setModels((prev) => prev.map((m) => (m.id === selectedModel.id ? updated : m)));
        setNotification(`Siklus hidup ${selectedModel.name} berhasil diset ke ${newStatus}.`);
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
            <History className="w-6 h-6 text-orange-500" />
            <span>Manajemen Deprecation & End-of-Life (Section 56)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tandai model usang (Deprecated), tentukan tanggal shutdown server (Retired), dan arahkan pengembang ke model pengganti resmi.
          </p>
        </div>

        <Link
          href="/models/deprecated"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition-colors"
        >
          <span>Halaman Deprecated Publik</span>
          <ExternalLink className="w-3.5 h-3.5" />
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
      </div>

      {/* Deprecations Table */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-4">Nama Model</th>
                <th className="py-4 px-4 font-mono">Model ID</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4">Tanggal Deprecated</th>
                <th className="py-4 px-4">Tanggal Shutdown</th>
                <th className="py-4 px-4">Model Pengganti</th>
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
                  <td className="py-4 px-4 text-center">
                    <ModelStatusBadge status={m.status} />
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                    {m.deprecatedDate || '—'}
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                    {m.shutdownDate ? <span className="text-rose-500 font-bold">{m.shutdownDate}</span> : 'Belum ditentukan'}
                  </td>
                  <td className="py-4 px-4 font-mono text-emerald-500 font-bold">
                    {m.recommendedReplacement || '—'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => openDeprecationModal(m)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 ml-auto"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Atur EOL</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Deprecation Modal */}
      {selectedModel && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Kelola Siklus Hidup: {selectedModel.name}
            </h3>

            <form onSubmit={handleSaveDeprecation} className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Status Model
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ModelStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="ACTIVE">ACTIVE (Model Aktif Produksi)</option>
                  <option value="PREVIEW">PREVIEW (Tahap Uji Coba)</option>
                  <option value="DEPRECATED">DEPRECATED (Mendekati Akhir Dukungan)</option>
                  <option value="RETIRED">RETIRED (Dinonaktifkan Permanen)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Tanggal Deprecated
                </label>
                <input
                  type="text"
                  value={deprecatedDate}
                  onChange={(e) => setDeprecatedDate(e.target.value)}
                  placeholder="mis. 18 Juli 2024"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Tanggal Shutdown (Retired Date)
                </label>
                <input
                  type="text"
                  value={shutdownDate}
                  onChange={(e) => setShutdownDate(e.target.value)}
                  placeholder="mis. 23 Maret 2025"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Rekomendasi Model Pengganti
                </label>
                <select
                  value={replacementModel}
                  onChange={(e) => setReplacementModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
                >
                  <option value="">Belum ditentukan</option>
                  {models.filter(m => m.status === 'ACTIVE').map(act => (
                    <option key={act.id} value={act.modelId}>
                      {act.name} ({act.modelId})
                    </option>
                  ))}
                </select>
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
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {saving ? 'Menyimpan...' : 'Simpan Status Siklus Hidup'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
