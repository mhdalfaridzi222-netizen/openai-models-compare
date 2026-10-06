'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types/model';
import {
  BookOpen,
  Search,
  Plus,
  Edit3,
  Eye,
  Calendar,
  User,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface Props {
  initialArticles: Article[];
}

export default function AdminArticlesClient({ initialArticles }: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState('');

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <span>Manajemen Artikel & CMS (Section 42 & 43)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kelola {articles.length} konten ensiklopedia, panduan pemilihan model, dan analisis teknis.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>

      {/* Search */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul, kategori, tag artikel..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-4">Judul Artikel</th>
                <th className="py-4 px-4">Kategori</th>
                <th className="py-4 px-4">Penulis</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Tanggal Rilis</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
              {filtered.map((art) => (
                <tr key={art.slug} className="hover:bg-slate-50/50 dark:hover:bg-[#161f30]/40 transition-colors">
                  <td className="py-4 px-4 max-w-md">
                    <div className="font-extrabold text-slate-900 dark:text-white truncate">
                      {art.title}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      /articles/{art.slug}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                      {art.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                    {art.author}
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">
                      {art.status || 'PUBLISHED'}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-slate-400 text-[11px]">
                    {art.publishedAt}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/articles/${art.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:text-slate-100 transition-colors"
                        title="Lihat Artikel Publik"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/articles/${art.slug}`}
                        className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold transition-colors"
                        title="Edit Artikel"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
