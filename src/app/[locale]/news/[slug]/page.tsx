import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { newsPosts } from '@/lib/placeholder-data';
import { ArticleContent } from './ArticleContent';

export async function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Not Found' };

  const title = locale === 'ja' ? post.titleJa : locale === 'en' ? post.titleEn : post.titleZh;
  const description = locale === 'ja' ? post.excerptJa : locale === 'en' ? post.excerptEn : post.excerptZh;

  return {
    title: `${title} | 品品Café`,
    description,
  };
}

export default function NewsArticlePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);

  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <ArticleContent post={post} />;
}
