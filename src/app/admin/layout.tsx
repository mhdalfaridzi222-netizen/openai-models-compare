'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If on login page, render standalone full-screen page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
