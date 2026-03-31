import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/lib/i18n/config';
import { newsPosts } from '@/lib/placeholder-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pinpincafe.com';

const staticPaths = [
  '',
  '/about',
  '/about/craft',
  '/menu',
  '/menu/eggcakes',
  '/menu/drinks',
  '/menu/seasonal',
  '/locations',
  '/news',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      const prefix = locale === defaultLocale ? '' : `/${locale}`;
      alternates[locale] = `${baseUrl}${prefix}${path}`;
    }

    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      alternates: { languages: alternates },
    });
  }

  // News article pages
  for (const post of newsPosts) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      const prefix = locale === defaultLocale ? '' : `/${locale}`;
      alternates[locale] = `${baseUrl}${prefix}/news/${post.slug}`;
    }

    entries.push({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      alternates: { languages: alternates },
    });
  }

  return entries;
}
