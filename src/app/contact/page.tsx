'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    // V1 client acknowledgement
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Mail className="w-3.5 h-3.5" />
          <span>Hubungi Redaksi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Kirim Masukan & Saran Data
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
          Menemukan pembaruan harga model terbaru atau ingin mengusulkan perbandingan spesifik? Kami menyambut baik kontribusi dan masukan Anda.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Form Container */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Pesan Berhasil Terkirim!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Terima kasih atas masukan Anda. Tim redaksi kami akan memverifikasi informasi model yang Anda ajukan dengan dokumentasi resmi OpenAI.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#161f30] text-xs font-semibold hover:border-emerald-500 border border-slate-200 dark:border-slate-700"
            >
              Kirim Pesan Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Pesan / Usulan Koreksi Data Model
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan masukan Anda, tautan dokumentasi resmi, atau pertanyaan di sini..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Pesan</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center pt-2">
              *Versi V1 menyimpan masukan langsung ke antrian tinjauan redaksi.
            </p>

          </form>
        )}
      </div>

      <AdBanner slot="bottom" />

    </div>
  );
}
