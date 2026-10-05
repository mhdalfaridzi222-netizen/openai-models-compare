'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Sparkles, Search, Menu, X, Scale, Sun, Moon, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isDarkStored = localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkStored);
    if (isDarkStored) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/models?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                {siteConfig.name}
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Search Box in Navbar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center relative max-w-xs w-full mx-4">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari model... (mis. o3-mini, GPT-4o)"
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </form>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            {siteConfig.navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-slate-100 dark:bg-[#161f30] text-emerald-500 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Right: Compare CTA & Theme Toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/compare"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Bandingkan</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500/50 transition-colors"
              title="Ganti Tema (Dark/Light)"
              aria-label="Toggle Dark/Light Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#161f30]"
              aria-label="Buka Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090d16] px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari model... (mis. o3-mini)"
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            />
          </form>

          <div className="space-y-1 pt-1">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#161f30] hover:text-emerald-500"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/compare"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white shadow"
            >
              Buka Halaman Komparasi (Head-to-Head)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
