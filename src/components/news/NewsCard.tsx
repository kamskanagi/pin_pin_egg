import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { TextLinkLabel } from '@/components/ui/TextLink';
import type { PlaceholderNewsPost } from '@/lib/placeholder-data';

const newsImages = [
  '/images/news/news-01.jpg',
  '/images/news/news-02.jpg',
  '/images/news/news-03.jpg',
];

interface NewsCardProps {
  post: PlaceholderNewsPost;
}


export function NewsCard({ post }: NewsCardProps) {
  const locale = useLocale();
  const t = useTranslations('news');

  const title = locale === 'ja' ? post.titleJa : locale === 'en' ? post.titleEn : post.titleZh;
  const excerpt = locale === 'ja' ? post.excerptJa : locale === 'en' ? post.excerptEn : post.excerptZh;
  const categoryLabel = t(post.category.replace('-', '_') as 'new_flavor' | 'store_opening' | 'collaboration' | 'event');

  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === 'ja' ? 'ja-JP' : locale === 'en' ? 'en-US' : 'zh-TW',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Link href={`/news/${post.slug}`} className="group block">
      <article>
        <div className="aspect-[16/10] rounded-sm bg-cream-dark relative overflow-hidden mb-6">
          <Image
            src={newsImages[post.slug.length % newsImages.length]}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <p className="text-[11px] tracking-[3px] uppercase text-warm-gold mb-3">
          {categoryLabel} · <time dateTime={post.publishedAt}>{date}</time>
        </p>

        <h3 className="font-serif italic text-3xl font-light leading-tight mb-3 transition-colors duration-300 group-hover:text-warm-gold-dark">
          {title}
        </h3>
        <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2 mb-5">
          {excerpt}
        </p>

        <TextLinkLabel>{t('read_more')}</TextLinkLabel>
      </article>
    </Link>
  );
}
