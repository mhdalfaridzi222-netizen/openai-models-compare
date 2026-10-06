import Link from 'next/link';
import { getSyncLogs } from '@/lib/db';
import { ArrowLeft, RefreshCw, ClipboardList, CheckCircle2, AlertTriangle } from 'lucide-react';

export default async function AdminSyncLogsPage() {
  const logs = await getSyncLogs(100);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/sync"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Sync Panel</span>
        </Link>

        <span className="text-xs text-slate-400">
          Menampilkan {logs.length} riwayat log terbaru
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-emerald-500" />
          <span>Riwayat Log Sinkronisasi (Section 20)</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Catatan kronologis proses pembaruan model dan tarif dari OpenAI official service.
        </p>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-4">Timestamp</th>
                <th className="py-4 px-4">Operasi</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4">Diproses</th>
                <th className="py-4 px-4">Ditambah</th>
                <th className="py-4 px-4">Diperbarui</th>
                <th className="py-4 px-4">Durasi</th>
                <th className="py-4 px-4">Sumber</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40 transition-colors">
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-400">
                    {new Date(log.createdAt).toLocaleString('id-ID')}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                    {log.operation}
                    {log.errors && (
                      <span className="block text-[10px] text-rose-500 font-normal truncate max-w-xs">
                        {log.errors}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
                      log.status === 'SUCCESS'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : log.status === 'PARTIAL'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono">{log.modelsProcessed}</td>
                  <td className="py-4 px-4 font-mono text-emerald-500 font-bold">+{log.modelsAdded}</td>
                  <td className="py-4 px-4 font-mono text-blue-500">{log.modelsUpdated}</td>
                  <td className="py-4 px-4 font-mono text-slate-400">{log.durationMs}ms</td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-400">{log.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
