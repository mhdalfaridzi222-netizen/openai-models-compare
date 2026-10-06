import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/db';
import ArticleEditorClient from './ArticleEditorClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminArticleEditorPage({ params }: Props) {
  const { id } = await params;

  if (id === 'new') {
    return <ArticleEditorClient isNew={true} />;
  }

  const article = await getArticleBySlug(id);
  if (!article) {
    notFound();
  }

  return <ArticleEditorClient article={article} isNew={false} />;
}
