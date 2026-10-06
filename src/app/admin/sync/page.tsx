import { getSyncLogs, getAllModels } from '@/lib/db';
import AdminSyncClient from './AdminSyncClient';

export default async function AdminSyncPage() {
  const [syncLogs, models] = await Promise.all([
    getSyncLogs(20),
    getAllModels({ includePrivate: true })
  ]);

  return (
    <div className="space-y-6 max-w-5xl">
      <AdminSyncClient initialLogs={syncLogs} totalModelsInDb={models.length} />
    </div>
  );
}
