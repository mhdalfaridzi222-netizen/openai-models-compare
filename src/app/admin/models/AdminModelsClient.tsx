'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Model, ModelStatus } from '@/types/model';
import ModelStatusBadge from '@/components/ModelStatusBadge';
import {
  Cpu,
  Search,
  Filter,
  Plus,
  Edit3,
  CheckCircle,
  Scale,
  Archive,
  ExternalLink,
  AlertTriangle,
  RefreshCw,
  Eye
} from 'lucide-react';

interface Props {
  initialModels: Model[];
}

export default function AdminModelsClient({ initialModels }: Props) {
  const [models, setModels] = useState<Model[]>(initialModels);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkActionType, setBulkActionType] = useState<string>('ACTIVE');
  const [bulkMessage, setBulkMessage] = useState<string | null>(null);

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.modelId.toLowerCase().includes(search.toLowerCase()) ||
        m.family.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;

      if (statusFilter === 'ALL') return true;
      if (statusFilter === 'FEATURED') return Boolean(m.isFeatured);
      if (statusFilter === 'RECENTLY_SYNCED') return Boolean(m.lastSyncedAt);
      return m.status === statusFilter;
    });
  }, [models, search, statusFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredModels.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredModels.map((m) => m.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleApplyBulkAction = () => {
    setModels((prev) =>
      prev.map((m) => {
        if (selectedIds.includes(m.id)) {
          if (bulkActionType === 'ARCHIVE') {
            return { ...m, isPublic: false, status: 'RETIRED' };
          }
          if (bulkActionType === 'PUBLISH') {
            return { ...m, isPublic: true };
          }
          return { ...m, status: bulkActionType as ModelStatus };
        }
        return m;
      })
    );
    setBulkMessage(`Berhasil menerapkan tindakan "${bulkActionType}" pada ${selectedIds.length} model.`);
    setSelectedIds([]);
    setIsBulkModalOpen(false);
    setTimeout(() => setBulkMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-500" />
            <span>Manajemen Model OpenAI</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kelola {models.length} model: spesifikasi API, status siklus hidup, dan verifikasi sumber resmi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/sync"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Import / Sync API</span>
          </Link>
          <Link
            href="/admin/models/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Model Baru</span>
          </Link>
        </div>
      </div>

      {bulkMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{bulkMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, model ID, family..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          {['ALL', 'ACTIVE', 'PREVIEW', 'DEPRECATED', 'RETIRED', 'FEATURED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                statusFilter === st
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-[#161f30] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Action Strip */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between gap-4 text-xs">
          <span className="font-bold text-indigo-700 dark:text-indigo-300">
            {selectedIds.length} model dipilih untuk tindakan massal.
          </span>
          <div className="flex items-center gap-2">
            <select
              value={bulkActionType}
              onChange={(e) => setBulkActionType(e.target.value)}
              className="bg-white dark:bg-[#111827] border border-indigo-300 dark:border-indigo-700 rounded-xl px-2.5 py-1 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="ACTIVE">Set Status: ACTIVE</option>
              <option value="PREVIEW">Set Status: PREVIEW</option>
              <option value="DEPRECATED">Set Status: DEPRECATED</option>
              <option value="RETIRED">Set Status: RETIRED</option>
              <option value="PUBLISH">Publish ke Publik</option>
              <option value="ARCHIVE">Arsipkan (Private)</option>
            </select>
            <button
              onClick={() => setIsBulkModalOpen(true)}
              className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
            >
              Terapkan Tindakan
            </button>
          </div>
        </div>
      )}

      {/* Models Table */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredModels.length && filteredModels.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded accent-emerald-500"
                  />
                </th>
                <th className="py-4 px-4">Nama & Model ID</th>
                <th className="py-4 px-4">Kategori</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4">Context</th>
                <th className="py-4 px-4">Harga 1M In/Out</th>
                <th className="py-4 px-4">Terakhir Update</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
              {filteredModels.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60 dark:hover:bg-[#161f30]/40 transition-colors">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(m.id)}
                      onChange={() => toggleSelect(m.id)}
                      className="rounded accent-emerald-500"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-extrabold text-slate-900 dark:text-white">{m.name}</div>
                    <code className="text-[10px] text-slate-400 font-mono">{m.modelId}</code>
                    {m.isPossiblyMissing && (
                      <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 font-bold">
                        Missing pada sync
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                    {m.category}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <ModelStatusBadge status={m.status} />
                  </td>
                  <td className="py-4 px-4 font-mono">
                    {m.contextWindow ? `${(m.contextWindow / 1000).toFixed(0)}k` : 'N/A'}
                  </td>
                  <td className="py-4 px-4 font-mono">
                    {m.inputPrice !== null ? `$${m.inputPrice} / $${m.outputPrice}` : 'N/A'}
                  </td>
                  <td className="py-4 px-4 text-slate-400 text-[11px]">
                    {m.lastUpdated}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/models/${m.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="Lihat Halaman Publik"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/models/${m.id}`}
                        className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-colors font-bold"
                        title="Edit Model"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/models/${m.id}/verify`}
                        className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors font-bold"
                        title="Verifikasi Sumber Resmi"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/compare?a=${m.id}&b=gpt-4o`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="Bandingkan Model"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Bulk Actions (Section 92) */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-500">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Konfirmasi Tindakan Massal
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Anda akan menerapkan tindakan <strong>"{bulkActionType}"</strong> secara serentak ke <strong>{selectedIds.length} model</strong> terpilih. Tindakan ini memengaruhi tampilan katalog dan perbandingan publik.
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Batal
              </button>
              <button
                onClick={handleApplyBulkAction}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Ya, Konfirmasi & Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
