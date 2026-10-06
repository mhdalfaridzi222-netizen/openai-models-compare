'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Cpu,
  Scale,
  BookOpen,
  Layers,
  HelpCircle,
  Image as ImageIcon,
  RefreshCw,
  Coins,
  History,
  Search,
  DollarSign,
  Settings,
  ClipboardList,
  LogOut,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Models', href: '/admin/models', icon: Cpu },
  { label: 'Pricing', href: '/admin/pricing', icon: Coins },
  { label: 'Deprecations', href: '/admin/deprecations', icon: History },
  { label: 'Sync Service', href: '/admin/sync', icon: RefreshCw },
  { label: 'Sync Logs', href: '/admin/sync/logs', icon: ClipboardList },
  { label: 'Articles CMS', href: '/admin/articles', icon: BookOpen },
  { label: 'FAQ CMS', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: ClipboardList },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 dark:bg-[#070a12] text-slate-300 min-h-screen flex flex-col justify-between border-r border-slate-800 shrink-0">
      <div className="p-5 space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-white tracking-tight block">
              Admin Console V2
            </span>
            <span className="text-[10px] text-slate-400">
              OpenAI Models Compare
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-5 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span>Buka Website Publik</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar (Logout)</span>
        </Link>
      </div>
    </aside>
  );
}
