import { MetadataRoute } from 'next';
import { getAllModelSlugs } from '@/data/models';
import { ARTICLES } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://openai-models-compare.vercel.app';

  const staticRoutes = [
    '',
    '/models',
    '/compare',
    '/calculator',
    '/models/deprecated',
    '/history',
    '/guides',
    '/guides/tokens',
    '/guides/context-window',
    '/guides/api-vs-chatgpt',
    '/articles',
    '/about',
    '/privacy',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const modelRoutes = getAllModelSlugs().map((slug) => ({
    url: `${baseUrl}/models/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const articleRoutes = ARTICLES.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...modelRoutes, ...articleRoutes];
}
