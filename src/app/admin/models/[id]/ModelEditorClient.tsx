'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Model, CategoryInfo, ModelStatus } from '@/types/model';
import {
  Save,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Info,
  DollarSign,
  Layers,
  Sparkles
} from 'lucide-react';

interface Props {
  model?: Model;
  isNew: boolean;
  categories: CategoryInfo[];
}

export default function ModelEditorClient({ model, isNew, categories }: Props) {
  const router = useRouter();

  // Form State
  const [name, setName] = useState(model?.name || '');
  const [modelId, setModelId] = useState(model?.modelId || '');
  const [slug, setSlug] = useState(model?.slug || '');
  const [family, setFamily] = useState(model?.family || 'GPT-4o');
  const [category, setCategory] = useState(model?.category || 'flagship');
  const [status, setStatus] = useState<ModelStatus>(model?.status || 'ACTIVE');
  const [shortDescription, setShortDescription] = useState(model?.shortDescription || '');
  const [description, setDescription] = useState(model?.description || '');
  const [contextWindow, setContextWindow] = useState<number | string>(model?.contextWindow || 128000);
  const [maxOutputTokens, setMaxOutputTokens] = useState<number | string>(model?.maxOutputTokens || 16384);
  const [knowledgeCutoff, setKnowledgeCutoff] = useState(model?.knowledgeCutoff || 'Oktober 2023');
  const [releaseDate, setReleaseDate] = useState(model?.releaseDate || '2024-05-13');
  const [officialUrl, setOfficialUrl] = useState(model?.officialUrl || 'https://platform.openai.com/docs/models');
  const [deprecatedDate, setDeprecatedDate] = useState(model?.deprecatedDate || '');
  const [shutdownDate, setShutdownDate] = useState(model?.shutdownDate || '');
  const [recommendedReplacement, setRecommendedReplacement] = useState(model?.recommendedReplacement || '');
  const [isFeatured, setIsFeatured] = useState(Boolean(model?.isFeatured));
  const [isPublic, setIsPublic] = useState(model?.isPublic !== false);

  // Pricing
  const [inputPrice, setInputPrice] = useState<number | string>(model?.inputPrice !== null && model?.inputPrice !== undefined ? model.inputPrice : '');
  const [cachedInputPrice, setCachedInputPrice] = useState<number | string>(model?.cachedInputPrice !== null && model?.cachedInputPrice !== undefined ? model.cachedInputPrice : '');
  const [outputPrice, setOutputPrice] = useState<number | string>(model?.outputPrice !== null && model?.outputPrice !== undefined ? model.outputPrice : '');

  // Capabilities
  const [reasoning, setReasoning] = useState(Boolean(model?.reasoning));
  const [vision, setVision] = useState(Boolean(model?.vision || model?.imageInput));
  const [imageGeneration, setImageGeneration] = useState(Boolean(model?.imageGeneration));
  const [audioInput, setAudioInput] = useState(Boolean(model?.audioInput));
  const [audioOutput, setAudioOutput] = useState(Boolean(model?.audioOutput));
  const [functionCalling, setFunctionCalling] = useState(model?.functionCalling !== false);
  const [structuredOutputs, setStructuredOutputs] = useState(model?.structuredOutputs !== false);
  const [webSearch, setWebSearch] = useState(Boolean(model?.webSearch));
  const [fileSearch, setFileSearch] = useState(Boolean(model?.fileSearch));
  const [computerUse, setComputerUse] = useState(Boolean(model?.computerUse));

  // Safety Confirmation Modal (Section 68)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check if sensitive fields changed
  const hasSensitiveChanges = () => {
    if (isNew) return false;
    return (
      Number(inputPrice) !== (model?.inputPrice || 0) ||
      Number(outputPrice) !== (model?.outputPrice || 0) ||
      status !== model?.status ||
      modelId !== model?.modelId ||
      reasoning !== Boolean(model?.reasoning) ||
      vision !== Boolean(model?.vision)
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasSensitiveChanges()) {
      setIsConfirmModalOpen(true);
    } else {
      executeSave();
    }
  };

  const executeSave = async () => {
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload: Partial<Model> = {
      id: model?.id || slug || modelId.toLowerCase(),
      name,
      modelId,
      slug: slug || modelId.toLowerCase(),
      family,
      category,
      status,
      shortDescription,
      description,
      contextWindow: contextWindow ? Number(contextWindow) : null,
      maxOutputTokens: maxOutputTokens ? Number(maxOutputTokens) : null,
      knowledgeCutoff,
      releaseDate,
      officialUrl,
      deprecatedDate: deprecatedDate || null,
      shutdownDate: shutdownDate || null,
      recommendedReplacement: recommendedReplacement || null,
      isFeatured,
      isPublic,
      inputPrice: inputPrice !== '' ? Number(inputPrice) : null,
      cachedInputPrice: cachedInputPrice !== '' ? Number(cachedInputPrice) : null,
      outputPrice: outputPrice !== '' ? Number(outputPrice) : null,
      reasoning,
      vision,
      imageInput: vision,
      imageGeneration,
      audioInput,
      audioOutput,
      functionCalling,
      structuredOutputs,
      webSearch,
      fileSearch,
      computerUse
    };

    try {
      const res = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: payload, adminEmail: 'admin@alfaridzi.dev' })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan model');
      }

      setSuccessMsg('Model berhasil disimpan dan dicatat ke Audit Trail!');
      setIsConfirmModalOpen(false);
      setTimeout(() => {
        router.push('/admin/models');
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/models"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Model</span>
        </Link>

        <span className="text-xs text-slate-400 font-mono">
          {isNew ? 'Mode: Buat Model Baru' : `ID: ${model?.id}`}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-emerald-500" />
          <span>{isNew ? 'Tambah Model Baru' : `Edit Model: ${model?.name}`}</span>
        </h1>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleFormSubmit} className="space-y-8">
        {/* Card 1: Identitas & Klasifikasi */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>1. Identitas & API Model ID</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Display Name (Nama Tampilan) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="mis. GPT-4o"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Official API Model ID * (Section 7)
              </label>
              <input
                type="text"
                required
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                placeholder="mis. gpt-4o"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Harus persis sama dengan parameter model di OpenAI API.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="mis. gpt-4o"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Model Family
              </label>
              <input
                type="text"
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                placeholder="mis. GPT-4o, o-series"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Kategori Model
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Status Model (Section 8)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ModelStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="ACTIVE">ACTIVE (Hijau - Siap Produksi)</option>
                <option value="PREVIEW">PREVIEW (Kuning - Evaluasi Awal)</option>
                <option value="DEPRECATED">DEPRECATED (Orange - Usang / Transisi)</option>
                <option value="RETIRED">RETIRED (Merah - Dinonaktifkan Fisik)</option>
                <option value="UNKNOWN">UNKNOWN (Abu-abu - Belum Diverifikasi)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Short Description (Ringkasan Singkat)
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Satu kalimat deskripsi padat untuk kartu katalog..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Deskripsi Lengkap
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Penjelasan mendalam arsitektur dan kapabilitas model..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Card 2: Spesifikasi & Konteks */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-500 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>2. Parameter Teknis & Batasan Token</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Context Window (Token)
              </label>
              <input
                type="number"
                value={contextWindow}
                onChange={(e) => setContextWindow(e.target.value)}
                placeholder="128000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Max Output Tokens
              </label>
              <input
                type="number"
                value={maxOutputTokens}
                onChange={(e) => setMaxOutputTokens(e.target.value)}
                placeholder="16384"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Knowledge Cutoff
              </label>
              <input
                type="text"
                value={knowledgeCutoff}
                onChange={(e) => setKnowledgeCutoff(e.target.value)}
                placeholder="Oktober 2023"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tanggal Rilis
              </label>
              <input
                type="text"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                placeholder="13 Mei 2024"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Dokumentasi Resmi URL
              </label>
              <input
                type="url"
                value={officialUrl}
                onChange={(e) => setOfficialUrl(e.target.value)}
                placeholder="https://platform.openai.com/docs/models/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Tarif Token (Pricing) */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-500 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>3. Tarif Token Resmi (USD per 1M Token)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Input Price ($ / 1M)
              </label>
              <input
                type="number"
                step="0.0001"
                value={inputPrice}
                onChange={(e) => setInputPrice(e.target.value)}
                placeholder="2.50"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Cached Input Price ($ / 1M)
              </label>
              <input
                type="number"
                step="0.0001"
                value={cachedInputPrice}
                onChange={(e) => setCachedInputPrice(e.target.value)}
                placeholder="1.25"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Output Price ($ / 1M)
              </label>
              <input
                type="number"
                step="0.0001"
                value={outputPrice}
                onChange={(e) => setOutputPrice(e.target.value)}
                placeholder="10.00"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Kemampuan (Capabilities Checklist) */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-500 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>4. Checklist Kemampuan Teknis (Capabilities)</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={reasoning}
                onChange={(e) => setReasoning(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Reasoning (o-series)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={vision}
                onChange={(e) => setVision(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Vision (Input Gambar)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={imageGeneration}
                onChange={(e) => setImageGeneration(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Image Generation (DALL·E)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={audioInput}
                onChange={(e) => setAudioInput(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Audio Input (Whisper)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={audioOutput}
                onChange={(e) => setAudioOutput(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Audio Output (TTS)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={functionCalling}
                onChange={(e) => setFunctionCalling(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Function Calling</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={structuredOutputs}
                onChange={(e) => setStructuredOutputs(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Structured Outputs</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-200 dark:border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={computerUse}
                onChange={(e) => setComputerUse(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Computer Use</span>
            </label>
          </div>
        </div>

        {/* Card 5: Visibilitas & Simpan */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span>Tampilkan di Publik</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span>Jadikan Featured</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin/models')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Section 68: Content Version Safety Warning Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-500">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Peringatan Perubahan Sensitif
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Perhatian:</strong> Perubahan pada <strong>Tarif Harga, Kemampuan (Capabilities), Status, atau API Model ID</strong> ini secara langsung memengaruhi halaman komparasi publik dan perhitungan di kalkulator token.
            </p>
            <p className="text-xs text-slate-500">
              Tindakan ini akan secara otomatis dicatat ke dalam <strong>Audit Logs</strong> dengan stempel waktu dan identitas admin Anda.
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Tinjau Ulang
              </button>
              <button
                type="button"
                onClick={executeSave}
                disabled={saving}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20"
              >
                {saving ? 'Menyimpan...' : 'Saya Mengerti, Konfirmasi Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
