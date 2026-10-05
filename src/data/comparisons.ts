import { FAQItem } from '@/types/model';

export interface ComparisonPreset {
  id: string;
  title: string;
  slug: string;
  description: string;
  modelIds: string[];
  highlight: string;
}

export const COMPARISON_PRESETS: ComparisonPreset[] = [
  {
    id: 'gpt4o-vs-o3mini',
    title: 'GPT-4o vs o3-mini',
    slug: 'gpt-4o-vs-o3-mini',
    description: 'Bandingkan model unggulan serbaguna multimodal (GPT-4o) melawan juara penalaran coding & matematika hemat biaya (o3-mini).',
    modelIds: ['gpt-4o', 'o3-mini'],
    highlight: 'Kecepatan Multimodal vs Ketajaman Penalaran Coding'
  },
  {
    id: 'gpt6-family',
    title: 'GPT-6 Astra vs GPT-6.1 Sol vs GPT-6 Luna',
    slug: 'gpt-6-astra-vs-gpt-6-1-sol-vs-gpt-6-luna',
    description: 'Komparasi tiga pilar arsitektur frontier masa depan: multimodal otonom (Astra), konteks masif 372k (Sol), dan efisiensi throughput (Luna).',
    modelIds: ['gpt-6-astra', 'gpt-6-1-sol', 'gpt-6-luna'],
    highlight: 'Evolusi Arsitektur Frontier & Agen Otonom'
  },
  {
    id: 'gpt4o-vs-mini',
    title: 'GPT-4o vs GPT-4o mini',
    slug: 'gpt-4o-vs-gpt-4o-mini',
    description: 'Apakah Anda benar-benar butuh GPT-4o penuh, atau GPT-4o mini yang 16x lebih murah sudah cukup untuk kebutuhan bisnis Anda?',
    modelIds: ['gpt-4o', 'gpt-4o-mini'],
    highlight: 'Akurasi Maksimal vs Nilai Efisiensi Anggaran'
  },
  {
    id: 'o1-vs-o3mini',
    title: 'o1 (Full) vs o3-mini',
    slug: 'o1-vs-o3-mini',
    description: 'Dua raksasa penalaran o-series: o1 dengan pemahaman visual diagram STEM vs o3-mini yang jauh lebih cepat dan terjangkau.',
    modelIds: ['o1', 'o3-mini'],
    highlight: 'Penalaran Multimodal vs Penalaran Coding Cepat'
  }
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    q: 'Apa model OpenAI terbaru saat ini?',
    a: 'Untuk lini produksi aktif yang stabil secara publik, model penalaran terbaru adalah o3-mini (rilis akhir Januari 2025) dan model penalaran penuh o1 (Desember 2024), berdampingan dengan lini flagship multimodal GPT-4o. Di lini riset frontier, OpenAI mengeksplorasi arsitektur agen generasi berikutnya seperti GPT-6 Astra.'
  },
  {
    q: 'Apa model OpenAI yang paling kuat untuk tugas umum dan penalaran?',
    a: 'Untuk penalaran mendalam, sains (STEM), dan logika kritis, o1 (Full) adalah model dengan performa tolok ukur tertinggi di dunia. Sementara untuk tugas teks dan visi serbaguna dengan kecepatan tinggi, GPT-4o adalah model terkuat yang paling seimbang.'
  },
  {
    q: 'Apa model OpenAI yang paling murah untuk API?',
    a: 'GPT-4o mini adalah model teks & visi termurah dengan harga hanya $0.15 per 1 juta token input dan $0.60 per 1 juta token output (dengan diskon prompt caching menjadi $0.075 per 1M token). Untuk model embedding pencarian, text-embedding-3-small bahkan lebih murah lagi di $0.02 per 1M token.'
  },
  {
    q: 'Apa itu context window pada model OpenAI?',
    a: 'Context window adalah batas total memori kerja gabungan teks input (instruksi, dokumen, riwayat chat) dan output yang dapat diproses model dalam satu kali panggilan. Model modern seperti GPT-4o memiliki konteks 128.000 token (~96.000 kata), sedangkan o3-mini dan o1 memiliki konteks 200.000 token (~150.000 kata).'
  },
  {
    q: 'Apa perbedaan mendasar antara model GPT dan Reasoning Model (o-series)?',
    a: 'Model GPT konvensional (seperti GPT-4o) memprediksi kata berikutnya secara instan dan intuitif. Sedangkan Reasoning Model (o1 dan o3-mini) menggunakan Reinforcement Learning untuk menghasilkan rantai pemikiran tersembunyi (Chain of Thought) selama beberapa detik sebelum menjawab, secara dramatis meminimalkan kesalahan logika dan halusinasi matematika/coding.'
  },
  {
    q: 'Apa itu model status Deprecated dan apakah masih bisa digunakan?',
    a: 'Model Deprecated adalah model lama yang secara resmi digantikan oleh model baru yang lebih baik (contoh: GPT-3.5 Turbo digantikan oleh GPT-4o mini). Model ini biasanya masih bisa dipanggil sementara waktu, namun pengembang sangat disarankan segera bermigrasi sebelum tanggal shutdown resmi (menjadi Retired).'
  },
  {
    q: 'Apakah model di ChatGPT sama persis dengan model di OpenAI API?',
    a: 'Tidak selalu identik. Model di ChatGPT telah disetel secara khusus (system prompt, batas guardrails, antarmuka web, web browsing default) untuk kenyamanan pengguna umum. Sementara di OpenAI API, pengembang mendapatkan akses kontrol langsung tanpa filter kepribadian tambahan, parameter teknis (temperature, top_p, reasoning_effort, structured outputs), serta harga murni berbasis token.'
  }
];
