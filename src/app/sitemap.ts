import { MetadataRoute } from 'next';
import { getAllModels, getAllArticles, getCategories, getComparisons } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mhdalfaridzi.vercel.app';

  const [models, articles, categories, comparisons] = await Promise.all([
    getAllModels(),
    getAllArticles(),
    getCategories(),
    getComparisons()
  ]);

  const staticRoutes = [
    '',
    '/models',
    '/find-model',
    '/compare',
    '/categories',
    '/calculator',
    '/models/deprecated',
    '/history',
    '/guides',
    '/guides/tokens',
    '/guides/context-window',
    '/guides/api-vs-chatgpt',
    '/articles',
    '/about',
    '/disclaimer',
    '/privacy',
    '/privacy-policy',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const modelRoutes = models.map((m) => ({
    url: `${baseUrl}/models/${m.slug}`,
    lastModified: new Date(m.lastVerifiedAt || '2026-10-06'),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const comparisonRoutes = comparisons.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...modelRoutes,
    ...categoryRoutes,
    ...comparisonRoutes,
    ...articleRoutes
  ];
}
