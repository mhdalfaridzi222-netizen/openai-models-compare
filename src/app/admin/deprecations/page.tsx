import { getAllModels } from '@/lib/db';
import AdminDeprecationsClient from './AdminDeprecationsClient';

export default async function AdminDeprecationsPage() {
  const models = await getAllModels({ includePrivate: true });

  return (
    <div className="space-y-6 max-w-6xl">
      <AdminDeprecationsClient initialModels={models} />
    </div>
  );
}
