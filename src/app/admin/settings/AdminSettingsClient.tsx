'use client';

import { useState } from 'react';
import { SiteSettingsEntity, SeoSettingsEntity, AdSettingsEntity } from '@/types/model';
import { Settings, Save, CheckCircle2, ShieldCheck, DollarSign, Globe, Sparkles } from 'lucide-react';

interface Props {
  initialSite: SiteSettingsEntity;
  initialSeo: SeoSettingsEntity;
  initialAds: AdSettingsEntity;
}

export default function AdminSettingsClient({ initialSite, initialSeo, initialAds }: Props) {
  const [siteName, setSiteName] = useState(initialSite.siteName);
  const [tagline, setTagline] = useState(initialSite.tagline);
  const [description, setDescription] = useState(initialSite.description);
  const [contactEmail, setContactEmail] = useState(initialSite.contactEmail);

  const [defaultTitle, setDefaultTitle] = useState(initialSeo.defaultTitle);
  const [defaultDescription, setDefaultDescription] = useState(initialSeo.defaultDescription);
  const [canonicalBase, setCanonicalBase] = useState(initialSeo.canonicalBase);
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState(initialSeo.googleAnalyticsId || '');

  const [adsensePublisherId, setAdsensePublisherId] = useState(initialAds.adsensePublisherId);
  const [adsEnabled, setAdsEnabled] = useState(initialAds.isEnabled);

  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: { siteName, tagline, description, contactEmail },
          seo: { defaultTitle, defaultDescription, canonicalBase, googleAnalyticsId: googleAnalyticsId || undefined },
          ads: { adsensePublisherId, isEnabled: adsEnabled },
          adminEmail: 'admin@alfaridzi.dev'
        })
      });

      if (res.ok) {
        setNotification('Semua pengaturan sistem berhasil disimpan!');
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
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-emerald-500" />
          <span>Pengaturan Sistem & Integrasi (Section 59 & 60)</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Konfigurasi identitas platform, metadata SEO global, Google Analytics, dan Google AdSense ID resmi.
        </p>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: Identitas Situs */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 text-emerald-500 uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>Identitas Platform</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Nama Website
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Deskripsi Global
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Email Kontak Administrator
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Card 2: Google AdSense */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 text-emerald-500 uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Monetisasi Google AdSense (Section 60)</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              AdSense Publisher ID
            </label>
            <input
              type="text"
              value={adsensePublisherId}
              onChange={(e) => setAdsensePublisherId(e.target.value)}
              placeholder="ca-pub-5683117405667471"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-emerald-500"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              ID ini secara otomatis mengaktifkan tag iklan resmi dan file validasi <code>/ads.txt</code>.
            </span>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={adsEnabled}
              onChange={(e) => setAdsEnabled(e.target.checked)}
              className="rounded accent-emerald-500"
            />
            <span>Aktifkan Penayangan Unit Iklan AdSense</span>
          </label>
        </div>

        {/* Card 3: SEO & Analytics */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 text-emerald-500 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>SEO Mesin Pencari & Analitik</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Canonical Base URL
              </label>
              <input
                type="text"
                value={canonicalBase}
                onChange={(e) => setCanonicalBase(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Google Analytics Measurement ID
              </label>
              <input
                type="text"
                value={googleAnalyticsId}
                onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#161f30] border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
