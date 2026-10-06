import { getAllModels } from '@/lib/db';
import AdminPricingClient from './AdminPricingClient';

export default async function AdminPricingPage() {
  const models = await getAllModels({ includePrivate: true });

  return (
    <div className="space-y-6 max-w-6xl">
      <AdminPricingClient initialModels={models} />
    </div>
  );
}
