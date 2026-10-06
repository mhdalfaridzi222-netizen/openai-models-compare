import { getAllModels } from '@/lib/db';
import AdminModelsClient from './AdminModelsClient';

export default async function AdminModelsPage() {
  const models = await getAllModels({ includePrivate: true });

  return (
    <div className="space-y-6 max-w-7xl">
      <AdminModelsClient initialModels={models} />
    </div>
  );
}
