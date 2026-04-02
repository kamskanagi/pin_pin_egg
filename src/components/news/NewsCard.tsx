'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { Badge } from '@/components/ui/Badge';
import type { PlaceholderNewsPost } from '@/lib/placeholder-data';
import type { NewsCategory } from '@/types/news';

const newsImages = [
  '/images/news/news-01.jpg',
  '/images/news/news-02.jpg',
  '/images/news/news-03.jpg',
];

interface NewsCardProps {
  post: PlaceholderNewsPost;
}

const categoryBadgeVariant: Record<NewsCategory, 'signature' | 'seasonal' | 'new' | 'limited'> = {
  'new-flavor': 'new',
  'store-opening': 'signature',
  collaboration: 'seasonal',
  event: 'limited',
};

export function NewsCard({ post }: NewsCardProps) {
  const locale = useLocale();
  const t = useTranslations('news');
  const prefersReducedMotion = useReducedMotion();

  const title = locale === 'ja' ? post.titleJa : locale === 'en' ? post.titleEn : post.titleZh;
  const excerpt = locale === 'ja' ? post.excerptJa : locale === 'en' ? post.excerptEn : post.excerptZh;
  const categoryLabel = t(post.category.replace('-', '_') as 'new_flavor' | 'store_opening' | 'collaboration' | 'event');

  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === 'ja' ? 'ja-JP' : locale === 'en' ? 'en-US' : 'zh-TW',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Link href={`/news/${post.slug}`}>
      <motion.article
        className="rounded-2xl bg-white overflow-hidden transition-shadow duration-500 ease-out-expo"
        whileHover={
          prefersReducedMotion
            ? undefined
            : { y: -8, boxShadow: '0 20px 40px rgba(42, 37, 32, 0.08)' }
        }
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="aspect-[16/9] bg-cream-dark relative overflow-hidden">
          <Image
            src={newsImages[post.slug.length % newsImages.length]}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="p-7">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant={categoryBadgeVariant[post.category]}>
              {categoryLabel}
            </Badge>
            <span className="text-xs text-charcoal-muted">{date}</span>
          </div>

          <h3 className="font-serif text-xl mb-2">{title}</h3>
          <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2">
            {excerpt}
          </p>

          <span className="inline-block mt-4 text-[13px] tracking-[1.5px] uppercase text-charcoal hover:text-warm-gold transition-colors">
            {t('read_more')} →
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
