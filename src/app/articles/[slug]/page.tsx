import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticleBySlug, getAllArticles, getAllModels } from '@/lib/db';
import AdBanner from '@/components/AdBanner';
import { Calendar, User, ArrowLeft, ArrowRight, Tag, Share2, Sparkles, Cpu } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: 'Artikel Tidak Ditemukan' };

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const [article, allArticles, allModels] = await Promise.all([
    getArticleBySlug(slug),
    getAllArticles(),
    getAllModels()
  ]);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  // Section 45: Related Models for this article
  let relatedModels = allModels.slice(0, 3);
  if (article.slug.includes('coding')) {
    relatedModels = allModels.filter(m => m.category === 'coding' || m.modelId === 'o3-mini' || m.modelId === 'o1').slice(0, 3);
  } else if (article.slug.includes('gambar') || article.slug.includes('image')) {
    relatedModels = allModels.filter(m => m.category === 'image' || m.imageGeneration || m.imageInput).slice(0, 3);
  } else if (article.slug.includes('audio') || article.slug.includes('realtime')) {
    relatedModels = allModels.filter(m => m.category === 'audio' || m.category === 'realtime').slice(0, 3);
  } else if (article.slug.includes('reasoning')) {
    relatedModels = allModels.filter(m => m.category === 'reasoning' || m.reasoning).slice(0, 3);
  } else {
    relatedModels = allModels.filter(m => ['gpt-4o', 'gpt-4o-mini', 'o3-mini'].includes(m.id)).slice(0, 3);
  }

  // Schema.org JSON-LD (Section 50)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mhdalfaridzi.vercel.app',
    },
  };

  const contentBlocks = article.content.split('\n\n');

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          href="/articles"
          className="hover:text-emerald-500 flex items-center gap-1.5 font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Semua Artikel</span>
        </Link>
        <span className="font-mono">{article.category}</span>
      </div>

      <AdBanner slot="top" />

      {/* Article Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{article.category}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span className="text-slate-700 dark:text-slate-300 font-semibold">{article.author}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Dipublikasikan: {article.publishedAt}</span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="bg-white dark:bg-[#111827] p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {contentBlocks.map((block, idx) => {
          if (block.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-base font-bold text-slate-900 dark:text-white pt-4">
                {block.replace('### ', '')}
              </h3>
            );
          }
          if (block.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-xl font-extrabold text-slate-900 dark:text-white pt-6 pb-1 border-b border-slate-100 dark:border-slate-800">
                {block.replace('## ', '')}
              </h2>
            );
          }
          if (block.startsWith('- ')) {
            const items = block.split('\n');
            return (
              <ul key={idx} className="space-y-1.5 list-disc list-inside pl-2 text-xs sm:text-sm">
                {items.map((it, iIdx) => (
                  <li key={iIdx}>{it.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }

          return (
            <div key={idx} className="space-y-4">
              <p>{block}</p>
              {idx === 2 && (
                <div className="my-6">
                  <AdBanner slot="article" />
                </div>
              )}
            </div>
          );
        })}

        {/* Tags */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400 font-semibold mr-1">Tags:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#161f30] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 45: RELATED MODELS IN ARTICLE */}
      {relatedModels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Model Terkait Pembahasan Ini
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedModels.map((m) => (
              <Link
                key={m.id}
                href={`/models/${m.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {m.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{m.modelId}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {m.shortDescription}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 self-start">
                  <span>Lihat Spesifikasi &rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Artikel Terkait Lainnya
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.slug}
              href={`/articles/${rel.slug}`}
              className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between group transition-colors"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-500 mb-1 block">
                  {rel.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
              </div>
              <span className="text-xs font-bold text-emerald-500 mt-4 flex items-center gap-1">
                <span>Baca Artikel</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <AdBanner slot="bottom" />
    </article>
  );
}
