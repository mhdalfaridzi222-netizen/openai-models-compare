import { getAuditLogs } from '@/lib/db';
import { ClipboardList, ShieldCheck } from 'lucide-react';

export default async function AdminAuditLogsPage() {
  const auditLogs = await getAuditLogs(100);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-500" />
          <span>Audit Trail & Log Perubahan Data (Section 67)</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Setiap manipulasi data (perubahan tarif, kemampuan teknis, status model, konten artikel) dicatat dengan stempel waktu dan identitas admin.
        </p>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-4">Timestamp</th>
                <th className="py-4 px-4">Admin Email</th>
                <th className="py-4 px-4">Tindakan (Action)</th>
                <th className="py-4 px-4">Entitas</th>
                <th className="py-4 px-4 font-mono">Entity ID</th>
                <th className="py-4 px-4">Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40 transition-colors">
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-400">
                    {new Date(log.createdAt).toLocaleString('id-ID')}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {log.adminEmail}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-500">
                    {log.entity}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-emerald-500">
                    {log.entityId}
                  </td>
                  <td className="py-4 px-4 text-slate-500 max-w-xs truncate">
                    {log.notes || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
