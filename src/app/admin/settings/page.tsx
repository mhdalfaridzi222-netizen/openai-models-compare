import { getSiteSettings, getSeoSettings, getAdSettings } from '@/lib/db';
import AdminSettingsClient from './AdminSettingsClient';

export default async function AdminSettingsPage() {
  const [site, seo, ads] = await Promise.all([
    getSiteSettings(),
    getSeoSettings(),
    getAdSettings()
  ]);

  return (
    <div className="space-y-6 max-w-4xl">
      <AdminSettingsClient initialSite={site} initialSeo={seo} initialAds={ads} />
    </div>
  );
}
