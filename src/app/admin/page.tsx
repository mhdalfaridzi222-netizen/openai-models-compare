import Link from 'next/link';
import {
  getAllModels,
  getAllArticles,
  getComparisons,
  getSyncLogs,
  getAuditLogs
} from '@/lib/db';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  Cpu,
  BookOpen,
  Scale,
  RefreshCw,
  Database,
  ShieldCheck,
  ArrowRight,
  Clock,
  AlertTriangle,
  Activity,
  CheckCircle2
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const [allModels, allArticles, comparisons, syncLogs, auditLogs] = await Promise.all([
    getAllModels({ includePrivate: true }),
    getAllArticles(),
    getComparisons(),
    getSyncLogs(5),
    getAuditLogs(5)
  ]);

  const activeModels = allModels.filter(m => m.status === 'ACTIVE').length;
  const previewModels = allModels.filter(m => m.status === 'PREVIEW').length;
  const deprecatedModels = allModels.filter(m => m.status === 'DEPRECATED').length;
  const retiredModels = allModels.filter(m => m.status === 'RETIRED').length;

  const lastSync = syncLogs[0];
  const dbConnected = isSupabaseConfigured();

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Admin Console Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manajemen terpusat database model OpenAI, sinkronisasi API resmi, CMS artikel, dan audit trail.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/sync"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>OpenAI Sync Panel</span>
          </Link>
        </div>
      </div>

      {/* Database & System Status Pill */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${dbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Database Status: <strong>{dbConnected ? 'Supabase PostgreSQL Terhubung' : 'Unified Repository Active (Fallback / Hybrid)'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span>Last Sync: <strong>{lastSync ? new Date(lastSync.createdAt).toLocaleString('id-ID') : 'Belum pernah'}</strong></span>
          <span>Sync Status: <strong className="text-emerald-500">{lastSync?.status || 'READY'}</strong></span>
        </div>
      </div>

      {/* KPI Cards Grid (Section 24) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Models */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Models</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{allModels.length}</div>
          <span className="text-[10px] text-slate-400">Dalam database</span>
        </div>

        {/* Active Models */}
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Active</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{activeModels}</div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300">Siap produksi</span>
        </div>

        {/* Preview Models */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Preview</span>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{previewModels}</div>
          <span className="text-[10px] text-amber-700 dark:text-amber-300">Tahap evaluasi</span>
        </div>

        {/* Deprecated Models */}
        <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 space-y-1">
          <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider block">Deprecated</span>
          <div className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">{deprecatedModels}</div>
          <span className="text-[10px] text-orange-700 dark:text-orange-300">Migrasi disarankan</span>
        </div>

        {/* Retired Models */}
        <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">Retired</span>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{retiredModels}</div>
          <span className="text-[10px] text-rose-700 dark:text-rose-300">Shutdown fisik</span>
        </div>
      </div>

      {/* Secondary Metrics: Articles, Comparisons, Analytics (Section 80 & 81) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Artikel Terbit</span>
            <BookOpen className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {allArticles.length}
          </div>
          <Link
            href="/admin/articles"
            className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1"
          >
            <span>Kelola Artikel CMS &rarr;</span>
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preset Perbandingan</span>
            <Scale className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {comparisons.length}
          </div>
          <Link
            href="/compare"
            target="_blank"
            className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1"
          >
            <span>Buka Matriks Perbandingan &rarr;</span>
          </Link>
        </div>

        {/* Section 80 & 81: Analytics placeholder without fake numbers */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Traffic & Analytics</span>
              <Activity className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Analytics belum dikonfigurasi.
            </p>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Sesuai panduan integritas data V2, statistik palsu tidak ditampilkan. Masukkan Google Analytics ID di menu Settings untuk mengaktifkan pelacakan pengunjung riil.
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors"
          >
            Konfigurasi Google Analytics ID &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Sync Logs & Recent Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sync Logs */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-500" />
              <span>Log Sinkronisasi Terakhir</span>
            </h3>
            <Link href="/admin/sync/logs" className="text-xs font-bold text-emerald-500 hover:underline">
              Semua Log &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {syncLogs.length === 0 ? (
              <p className="text-xs text-slate-400">Belum ada log sync.</p>
            ) : (
              syncLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{log.operation}</div>
                    <span className="text-[10px] text-slate-400">
                      {log.modelsProcessed} diproses • {log.modelsAdded} ditambah • {log.durationMs}ms
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                    log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Audit Trail (Section 67) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>Audit Trail (Perubahan Data)</span>
            </h3>
            <Link href="/admin/audit-logs" className="text-xs font-bold text-indigo-500 hover:underline">
              Semua Audit &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {auditLogs.length === 0 ? (
              <p className="text-xs text-slate-400">Belum ada catatan audit.</p>
            ) : (
              auditLogs.map((aud) => (
                <div
                  key={aud.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {aud.action}: <span className="font-mono text-emerald-500">{aud.entityId}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      oleh {aud.adminEmail} • {new Date(aud.createdAt).toLocaleTimeString('id-ID')}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {aud.entity}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
