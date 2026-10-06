import { getFaqs } from '@/lib/db';
import AdminFaqsClient from './AdminFaqsClient';

export default async function AdminFaqsPage() {
  const faqs = await getFaqs();

  return (
    <div className="space-y-6 max-w-5xl">
      <AdminFaqsClient initialFaqs={faqs} />
    </div>
  );
}
