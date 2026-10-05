import { CategoryInfo, ModelCategory } from '@/types/model';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'flagship',
    name: 'Flagship Models',
    slug: 'flagship',
    icon: '⚡',
    tagline: 'Model serbaguna tercanggih untuk pemrosesan teks, visi, dan instruksi umum.',
    description: 'Model multimodal tingkat unggulan yang menggabungkan kecepatan inferensi tinggi, pemahaman visual mendalam, dan kapabilitas penalaran umum seimbang.',
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
  },
  {
    id: 'reasoning',
    name: 'Reasoning Models',
    slug: 'reasoning',
    icon: '🧠',
    tagline: 'Dirancang untuk berpikir mendalam, sains (STEM), matematika, dan logika rumit.',
    description: 'Rangkaian model penalaran (o-series) yang menghabiskan waktu komputasi ekstra untuk memvalidasi langkah berpikir sebelum menghasilkan jawaban.',
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
  },
  {
    id: 'coding',
    name: 'Coding & Agentic',
    slug: 'coding',
    icon: '💻',
    tagline: 'Dioptimalkan untuk rekayasa perangkat lunak, debugging, dan agen otonom.',
    description: 'Model yang dilatih secara khusus untuk memahami repositori kode multi-file, arsitektur sistem, dan alur kerja agen mandiri.',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  },
  {
    id: 'image',
    name: 'Image & Creative',
    slug: 'image',
    icon: '🎨',
    tagline: 'Pembuatan gambar realistis dan interpretasi visual dari deskripsi teks.',
    description: 'Keluarga model DALL-E untuk sintesis visual resolusi tinggi, editing gambar inpainting, dan variasi desain.',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
  },
  {
    id: 'audio',
    name: 'Audio & Speech',
    slug: 'audio',
    icon: '🎙️',
    tagline: 'Transkripsi audio multibahasa dan sintesis suara alami (Text-to-Speech).',
    description: 'Model Whisper untuk pengenalan wicara akurat dan model TTS untuk mengubah teks tertulis menjadi ucapan audio berkualitas studio.',
    badgeColor: 'bg-pink-500/10 text-pink-500 border-pink-500/20'
  },
  {
    id: 'realtime',
    name: 'Realtime Voice',
    slug: 'realtime',
    icon: '⚡',
    tagline: 'Percakapan audio dua arah berlatensi ultra-rendah melalui WebSocket.',
    description: 'Model multimodal suara-ke-suara langsung tanpa jeda pipeline terpisah, cocok untuk asisten percakapan interaktif.',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/20'
  },
  {
    id: 'embeddings',
    name: 'Embeddings & RAG',
    slug: 'embeddings',
    icon: '🔎',
    tagline: 'Vektorisasi teks berdimensi tinggi untuk pencarian semantik dan basis data RAG.',
    description: 'Mengubah teks menjadi vektor numerik untuk mengukur keterkaitan makna dalam mesin pencari dan retrieval-augmented generation.',
    badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
  },
  {
    id: 'moderation',
    name: 'Safety & Moderation',
    slug: 'moderation',
    icon: '🛡️',
    tagline: 'Pendeteksian konten sensitif, berbahaya, atau melanggar kebijakan secara gratis.',
    description: 'Model machine learning untuk mengklasifikasikan teks dan gambar terhadap kategori ujaran kebencian, kekerasan, dan keselamatan.',
    badgeColor: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
  },
  {
    id: 'open-weight',
    name: 'Open-Weight Models',
    slug: 'open-weight',
    icon: '📦',
    tagline: 'Model bobot terbuka untuk riset independen dan penerapan mandiri.',
    description: 'Arsitektur model terbuka dari inisiatif riset OpenAI yang memungkinkan eksplorasi parameter bobot secara lokal.',
    badgeColor: 'bg-teal-500/10 text-teal-500 border-teal-500/20'
  },
  {
    id: 'deprecated',
    name: 'Deprecated & Retired',
    slug: 'deprecated',
    icon: '⏳',
    tagline: 'Model warisan historis yang sudah dihentikan atau mendekati tanggal shutdown.',
    description: 'Basis data historis model-model lama OpenAI beserta tanggal masa akhir dukungan dan model pengganti yang disarankan.',
    badgeColor: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
  }
];

export function getCategoryById(id: ModelCategory): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.id === id);
}
