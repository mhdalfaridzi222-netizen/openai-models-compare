import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import { History, Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Garis Waktu Perkembangan Model OpenAI (History & Evolution)',
  description: 'Timeline komprehensif evolusi model OpenAI dari era awal GPT-1, GPT-3, GPT-4, omnimodal GPT-4o, model penalaran o-series, hingga generasi terkini.',
};

export default function HistoryPage() {
  const timelineMilestones = [
    {
      era: '2018 - 2019',
      title: 'Fondasi Awal: GPT-1 & GPT-2',
      badge: 'Generasi Awal',
      summary: 'Eksperimen pembuktian konsep arsitektur Transformer decoder-only untuk general-purpose pre-training.',
      points: [
        'GPT-1 (Juni 2018): Membuktikan bahwa pre-training tanpa pengawasan pada korpus buku dapat menghasilkan pemahaman bahasa yang solid (117 juta parameter).',
        'GPT-2 (Februari 2019): Melompat ke 1.5 miliar parameter, mampu memproduksi paragraf koheren; OpenAI awalnya menahan rilis penuh karena kekhawatiran misinformasi.'
      ]
    },
    {
      era: '2020 - 2022',
      title: 'Era Penskalaan: GPT-3 & InstructGPT',
      badge: 'Few-Shot Learning',
      summary: 'Pergeseran paradigma dari fine-tuning ke *in-context learning* dan perintisan Reinforcement Learning from Human Feedback (RLHF).',
      points: [
        'GPT-3 (Juni 2020): Peluncuran model raksasa 175 miliar parameter dengan kemampuan few-shot learning tanpa training tambahan.',
        'Peluncuran OpenAI API: Membuka akses model untuk pertama kalinya kepada pengembang global.',
        'InstructGPT (Awal 2022): Mengimplementasikan RLHF untuk menyelaraskan model agar mematuhi instruksi secara jujur, aman, dan relevan.'
      ]
    },
    {
      era: 'Akhir 2022 - Awal 2023',
      title: 'Momen ChatGPT & GPT-3.5 Turbo',
      badge: 'Adopsi Massal Global',
      summary: 'Peluncuran produk AI konsumen tercepat mencapai 100 juta pengguna dalam sejarah teknologi.',
      points: [
        'ChatGPT (30 November 2022): Pratinjau penelitian gratis yang memicu gelombang revolusi kecerdasan buatan di seluruh dunia.',
        'GPT-3.5 Turbo API (Maret 2023): Memangkas biaya inferensi hingga 90% ($0.002 / 1k token), memungkinkan ribuan startup membangun aplikasi AI komersial.'
      ]
    },
    {
      era: '2023 - Awal 2024',
      title: 'Lompatan Multimodal: GPT-4 & GPT-4 Turbo',
      badge: 'Frontier Intelligence',
      summary: 'Kemampuan setara manusia dalam ujian akademik profesional dan perluasan context window hingga 128k.',
      points: [
        'GPT-4 (Maret 2023): Lulus ujian Bar hukum AS di persentil 90 teratas dan olimpiade biologi; memperkenalkan input visi citra.',
        'GPT-4 Turbo (November 2023): Diperkenalkan pada DevDay perdana dengan context window 128k, JSON mode, dan pembaruan cutoff pengetahuan.'
      ]
    },
    {
      era: 'Pertengahan 2024',
      title: 'Omnimodalitas Asli: GPT-4o & GPT-4o mini',
      badge: 'Omni Experience',
      summary: 'Pemrosesan teks, visual, dan audio secara terpadu dalam satu jaringan saraf end-to-end tanpa latensi pipeline bertingkat.',
      points: [
        'GPT-4o ("Omni" - Mei 2024): Menghasilkan kecepatan dua kali lipat GPT-4 Turbo dengan efisiensi biaya 50% lebih murah.',
        'GPT-4o mini (Juli 2024): Model kecil bertenaga yang menggantikan GPT-3.5 Turbo secara permanen dengan harga hanya $0.15 / 1M token input.',
        'Structured Outputs (Agustus 2024): OpenAI menjamin 100% kepatuhan respon terhadap skema JSON yang ditentukan pengembang.'
      ]
    },
    {
      era: 'Akhir 2024 - 2025',
      title: 'Era Model Penalaran (Reasoning): o-Series',
      badge: 'System 2 Thinking',
      summary: 'Inovasi komputasi waktu inferensi (test-time compute) yang memecahkan masalah matematika, logika, dan pemrograman tingkat olimpiade.',
      points: [
        'OpenAI o1 & o1-mini (September 2024): Model pertama yang menghabiskan waktu internal untuk "berpikir" sebelum menjawab melalui rantai pemikiran tersembunyi (*chain-of-thought*).',
        'OpenAI o3-mini (Januari 2025): Model penalaran cepat dan hemat biaya yang mencetak rekor skor 78.3% pada benchmark rekayasa software SWE-bench.'
      ]
    },
    {
      era: '2025 - 2026',
      title: 'Frontier Lanjutan & Open-Weight (GPT-6 & OSS)',
      badge: 'Next-Gen Frontier',
      summary: 'Eksplorasi context window jutaan token, model otonom agentik skala besar, dan model bobot terbuka untuk komunitas riset.',
      points: [
        'GPT-6 Astra / Sol / Luna Series: Paradigma model berkapasitas context hingga 1.05M token dengan pengoptimalan workload komputasi tinggi dan low-latency.',
        'gpt-oss Series (120B / 20B): Langkah eksplorasi bobot terbuka untuk fleksibilitas deployment lokal pengembang enterprise.'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <History className="w-3.5 h-3.5" />
          <span>Timeline Historis Resmi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Garis Waktu Evolusi Model OpenAI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Menyusuri perjalanan inovasi kecerdasan buatan dari Transformer generasi pertama hingga era penalaran o-series dan frontier saat ini.
        </p>
      </div>

      <AdBanner slot="top" />

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-12">
        {timelineMilestones.map((item, idx) => (
          <div key={idx} className="relative group">
            
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#111827] border-4 border-emerald-500 group-hover:scale-125 transition-transform" />

            <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {item.era}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#161f30] text-slate-600 dark:text-slate-300">
                  {item.badge}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {item.title}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {item.summary}
              </p>

              <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                {item.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>

      {/* Navigation footer */}
      <div className="bg-slate-50 dark:bg-[#161f30] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">Ingin melihat model lama yang sudah dimatikan?</span>
          <span className="text-slate-500">Kunjungi pangkalan data model deprecated kami.</span>
        </div>
        <Link
          href="/models/deprecated"
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors flex items-center gap-1.5 shadow"
        >
          <span>Pangkalan Data Deprecated</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <AdBanner slot="bottom" />

    </div>
  );
}
