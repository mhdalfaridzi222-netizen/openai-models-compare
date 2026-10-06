import { notFound } from 'next/navigation';
import { getModelById, getAllModels, getCategories } from '@/lib/db';
import ModelEditorClient from './ModelEditorClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminModelEditorPage({ params }: Props) {
  const { id } = await params;
  const categories = await getCategories();

  if (id === 'new') {
    return <ModelEditorClient isNew={true} categories={categories} />;
  }

  const model = await getModelById(id);
  if (!model) {
    notFound();
  }

  return <ModelEditorClient model={model} isNew={false} categories={categories} />;
}
