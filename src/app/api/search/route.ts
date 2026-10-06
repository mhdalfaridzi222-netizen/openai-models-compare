import { NextRequest, NextResponse } from 'next/server';
import { getAllModels, getAllArticles, getComparisons } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ models: [], articles: [], comparisons: [] });
  }

  const [allModels, allArticles, allComparisons] = await Promise.all([
    getAllModels(),
    getAllArticles(),
    getComparisons()
  ]);

  // Model search logic matching query, capabilities, categories, family
  const matchedModels = allModels.filter(m => {
    return (
      m.name.toLowerCase().includes(q) ||
      m.modelId.toLowerCase().includes(q) ||
      m.family.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      (q === 'reasoning' && m.reasoning) ||
      (q === 'image' && (m.imageInput || m.imageGeneration)) ||
      (q === 'audio' && (m.audioInput || m.audioOutput)) ||
      (q === 'vision' && m.vision) ||
      (q === 'coding' && m.suitableFor.some(s => s.toLowerCase().includes('kod') || s.toLowerCase().includes('code')))
    );
  }).slice(0, 10);

  // Article search logic
  const matchedArticles = allArticles.filter(a => {
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }).slice(0, 5);

  // Comparison search logic
  const matchedComparisons = allComparisons.filter(c => {
    return (
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.modelIds.some(id => id.toLowerCase().includes(q))
    );
  }).slice(0, 5);

  return NextResponse.json({
    query: q,
    models: matchedModels,
    articles: matchedArticles,
    comparisons: matchedComparisons
  });
}
