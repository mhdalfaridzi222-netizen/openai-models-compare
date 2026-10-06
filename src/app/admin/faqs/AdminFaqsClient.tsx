'use client';

import { useState } from 'react';
import { FAQItem } from '@/types/model';
import { HelpCircle, Plus, Edit3, Trash2, CheckCircle2, Save } from 'lucide-react';

interface Props {
  initialFaqs: FAQItem[];
}

export default function AdminFaqsClient({ initialFaqs }: Props) {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const openNewModal = () => {
    setEditingFaq(null);
    setQ('');
    setA('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: FAQItem) => {
    setEditingFaq(item);
    setQ(item.q);
    setA(item.a);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const faqPayload: FAQItem = {
      id: editingFaq?.id || `faq-${Date.now()}`,
      q,
      a,
      isPublished: true
    };

    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faq: faqPayload, adminEmail: 'admin@alfaridzi.dev' })
      });

      if (res.ok) {
        if (editingFaq) {
          setFaqs(prev => prev.map(f => f.q === editingFaq.q ? faqPayload : f));
          setNotification('FAQ berhasil diperbarui.');
        } else {
          setFaqs(prev => [...prev, faqPayload]);
          setNotification('FAQ baru berhasil ditambahkan.');
        }
        setIsModalOpen(false);
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
            <HelpCircle className="w-6 h-6 text-emerald-500" />
            <span>Manajemen Pertanyaan Umum (FAQ CMS)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kelola pertanyaan dan jawaban resmi seputar model OpenAI untuk ditampilkan di homepage dan panduan.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah FAQ Baru</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((f, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-mono">
                  {idx + 1}
                </span>
                <span>{f.q}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                {f.a}
              </p>
            </div>

            <button
              onClick={() => openEditModal(f)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-600 dark:text-slate-300 transition-colors shrink-0"
              title="Edit FAQ"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {editingFaq ? 'Edit Pertanyaan FAQ' : 'Tambah Pertanyaan FAQ Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Pertanyaan *
                </label>
                <input
                  type="text"
                  required
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="mis. Apa model OpenAI termurah untuk API?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Jawaban Lengkap *
                </label>
                <textarea
                  rows={4}
                  required
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  placeholder="Jawaban komprehensif dan objektif berdasarkan sumber resmi..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  {saving ? 'Menyimpan...' : 'Simpan FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
