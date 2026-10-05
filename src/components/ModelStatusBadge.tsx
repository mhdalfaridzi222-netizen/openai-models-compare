import { ModelStatus } from '@/types/model';

interface Props {
  status: ModelStatus;
  className?: string;
}

export default function ModelStatusBadge({ status, className = '' }: Props) {
  switch (status) {
    case 'ACTIVE':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>Active</span>
        </span>
      );
    case 'PREVIEW':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
          <span>Preview</span>
        </span>
      );
    case 'DEPRECATED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
          <span>Deprecated</span>
        </span>
      );
    case 'RETIRED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
          <span>Retired</span>
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-500/10 text-slate-500 border border-slate-500/20 ${className}`}>
          <span>Unknown</span>
        </span>
      );
  }
}
