import { getAllArticles } from '@/lib/db';
import AdminArticlesClient from './AdminArticlesClient';

export default async function AdminArticlesPage() {
  const articles = await getAllArticles({ status: 'ALL' });

  return (
    <div className="space-y-6 max-w-6xl">
      <AdminArticlesClient initialArticles={articles} />
    </div>
  );
}
