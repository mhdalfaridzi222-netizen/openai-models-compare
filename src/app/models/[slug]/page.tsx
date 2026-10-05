import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllModelSlugs, getModelBySlug, getAllModels } from '@/data/models';
import ModelStatusBadge from '@/components/ModelStatusBadge';
import AdBanner from '@/components/AdBanner';
import { 
  Check, 
  X, 
  ExternalLink, 
  Copy, 
  Scale, 
  Info, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Clock, 
  Brain, 
  Eye, 
  FileText 
} from 'lucide-react';
import { siteConfig } from '@/config/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllModelSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelBySlug(slug);

  if (!model) return { title: 'Model Tidak Ditemukan' };

  return {
    title: `${model.name} (${model.modelId}): Spesifikasi, Harga, & Kemampuan`,
    description: `${model.shortDescription} Pelajari context window, harga token input/output, tolok ukur, dan kecocokan penggunaan model ${model.name}.`,
    openGraph: {
      title: `${model.name} — Spesifikasi & Harga API | ${siteConfig.name}`,
      description: model.shortDescription,
    }
  };
}

export default async function ModelDetailPage({ params }: Props) {
  const { slug } = await params;
  const model = getModelBySlug(slug);

  if (!model) {
    notFound();
  }

  const allModels = getAllModels();
  const relatedModels = allModels.filter(m => m.id !== model.id && (m.category === model.category || m.family === model.family)).slice(0, 3);

  const formatPrice = (p: number | null) => {
    if (p === null || p === undefined) return 'Belum tersedia / N/A';
    if (p === 0) return 'Gratis ($0.00)';
    return `$${p.toFixed(2)} per 1M token`;
  };

  const formatContext = (c: number | null) => {
    if (c === null || c === undefined) return 'N/A';
    return `${c.toLocaleString('id-ID')} token`;
  };

  // Schema.org JSON-LD (Section 28)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: model.name,
    softwareVersion: model.modelId,
    applicationCategory: 'AI Model',
    description: model.description,
    operatingSystem: 'OpenAI API Cloud',
    offers: {
      '@type': 'Offer',
      price: model.inputPrice !== null ? String(model.inputPrice) : '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/models" className="hover:underline">Models</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-semibold">{model.name}</span>
      </nav>

      {/* Top Advertisement */}
      <AdBanner slot="top" />

      {/* Hero Header Card */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <ModelStatusBadge status={model.status} />
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#161f30] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
              model: "{model.modelId}"
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {model.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {model.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Rilis: {model.releaseDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Pembaruan Data: {model.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Action Button: Compare */}
        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
          <Link
            href={`/compare?a=${model.id}`}
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Scale className="w-4 h-4" />
            <span>Bandingkan Model Ini</span>
          </Link>
          <a
            href={model.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-[#161f30] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
          >
            <span>Dokumentasi Resmi</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* SECTION 1: RINGKASAN & FUNGSI (Section 10) */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Ringkasan & Fungsi Model</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {model.description}
        </p>
        {model.reasoning && (
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 leading-relaxed flex items-start gap-2.5">
            <Brain className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Model Penalaran (o-Series):</strong> Model ini mengalokasikan token komputasi penalaran internal (*thinking time*) untuk merencanakan dan memverifikasi langkah logika sebelum memproduksi token jawaban.
            </span>
          </div>
        )}
      </div>

      {/* SECTION 2: SPESIFIKASI TEKNIS (Section 10) */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-500" />
          <span>Spesifikasi Teknis</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">API Model ID</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{model.modelId}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Jendela Konteks (Context Window)</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{formatContext(model.contextWindow)}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Batas Output Maksimal</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{formatContext(model.maxOutputTokens)}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Knowledge Cutoff</span>
            <span className="font-semibold text-slate-900 dark:text-white text-xs">{model.knowledgeCutoff}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Kemampuan Reasoning</span>
            <span className="font-semibold text-slate-900 dark:text-white text-xs">{model.reasoning ? 'Ya (o-series)' : 'Standar Autoregresif'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161f30] border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Tipe Input & Output</span>
            <span className="font-semibold text-slate-900 dark:text-white text-xs">
              Input: {model.imageInput ? 'Teks + Citra' : model.audioInput ? 'Teks + Audio' : 'Teks'} • Output: {model.audioOutput ? 'Audio/Teks' : model.imageGeneration ? 'Citra' : 'Teks'}
            </span>
          </div>

        </div>
      </div>

      {/* ARTICLE ADVERTISEMENT (Section 30) */}
      <AdBanner slot="article" />

      {/* SECTION 3: KEMAMPUAN MODEL (Section 10) */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Daftar Kemampuan (Capabilities)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {[
            { label: 'Pemrosesan Teks', active: true },
            { label: 'Image Input (Vision)', active: model.imageInput },
            { label: 'Image Generation', active: model.imageGeneration },
            { label: 'Audio Input', active: model.audioInput },
            { label: 'Audio Output', active: model.audioOutput },
            { label: 'Function Calling (Tools)', active: model.functionCalling },
            { label: 'Structured Outputs (JSON)', active: model.structuredOutputs },
            { label: 'Web Search', active: model.webSearch },
            { label: 'File Search', active: model.fileSearch },
            { label: 'Computer Use', active: model.computerUse },
          ].map((cap, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                cap.active
                  ? 'bg-emerald-500/10 dark:bg-emerald-950/20 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold'
                  : 'bg-slate-50 dark:bg-[#161f30] border-slate-200 dark:border-slate-800 text-slate-400 font-normal'
              }`}
            >
              <span>{cap.label}</span>
              {cap.active ? (
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <X className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: TABEL HARGA RESMI (Section 10) */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Tabel Harga Resmi API
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-[#161f30] text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-4">Jenis Token</th>
                <th className="p-4">Tarif per 1M Token (USD)</th>
                <th className="p-4">Estimasi Kurs Rupiah (IDR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-4 font-semibold">Input Tokens (Prompt Baru)</td>
                <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatPrice(model.inputPrice)}
                </td>
                <td className="p-4 font-mono text-slate-400">
                  {model.inputPrice !== null ? `≈ Rp ${Math.round(model.inputPrice * 16000).toLocaleString('id-ID')} / 1M` : 'N/A'}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Cached Input Tokens (Diskon 50%)</td>
                <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatPrice(model.cachedInputPrice)}
                </td>
                <td className="p-4 font-mono text-slate-400">
                  {model.cachedInputPrice !== null ? `≈ Rp ${Math.round(model.cachedInputPrice * 16000).toLocaleString('id-ID')} / 1M` : 'N/A'}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Output Tokens (Respon Dihasilkan)</td>
                <td className="p-4 font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                  {formatPrice(model.outputPrice)}
                </td>
                <td className="p-4 font-mono text-slate-400">
                  {model.outputPrice !== null ? `≈ Rp ${Math.round(model.outputPrice * 16000).toLocaleString('id-ID')} / 1M` : 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mandatory Pricing Disclaimer (Section 10) */}
        <p className="text-[11px] text-amber-600 dark:text-amber-400 italic">
          *Harga dapat berubah. Periksa dokumentasi resmi OpenAI untuk harga terbaru.
        </p>
      </div>

      {/* SECTION 5: COCOK UNTUK & TIDAK COCOK UNTUK (Section 10) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Suitable For */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-emerald-500/30 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Cocok untuk Penggunaan:</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {model.suitableFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Suitable For */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-rose-500/30 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <X className="w-4 h-4" />
            <span>Tidak Cocok untuk / Keterbatasan:</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {model.notSuitableFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* SECTION 6: SUMBER RESMI & VERIFIKASI (Section 10 & 47) */}
      <div className="bg-slate-50 dark:bg-[#161f30] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-300">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Informasi Validitas & Sumber Resmi
        </h3>
        <p>
          Seluruh data spesifikasi di halaman ini dirujuk langsung dari portal dokumentasi resmi pengembang:
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={model.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:underline font-mono inline-flex items-center gap-1 font-semibold"
          >
            <span>{model.officialUrl}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">Terakhir diverifikasi: <strong>{model.lastUpdated}</strong></span>
        </div>
      </div>

      {/* SECTION 7: RELATED MODELS IN SAME FAMILY */}
      {relatedModels.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Model Terkait Lainnya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedModels.map((rel) => (
              <Link
                key={rel.id}
                href={`/models/${rel.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="text-slate-900 dark:text-white block font-bold">{rel.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono font-normal">{rel.modelId}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-500" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Advertisement */}
      <AdBanner slot="bottom" />

    </div>
  );
}
