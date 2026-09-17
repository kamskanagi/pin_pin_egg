'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { PlaceholderNewsPost } from '@/lib/placeholder-data';
import type { NewsCategory } from '@/types/news';

const newsImages = [
  '/images/news/news-01.jpg',
  '/images/news/news-02.jpg',
  '/images/news/news-03.jpg',
];

interface ArticleContentProps {
  post: PlaceholderNewsPost;
}

const categoryBadgeVariant: Record<NewsCategory, 'signature' | 'seasonal' | 'new' | 'limited'> = {
  'new-flavor': 'new',
  'store-opening': 'signature',
  collaboration: 'seasonal',
  event: 'limited',
};

/** Renders `**bold**` spans as React elements — text is never injected as HTML. */
function renderInlineBold(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i} className="text-charcoal font-medium">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export function ArticleContent({ post }: ArticleContentProps) {
  const locale = useLocale();
  const t = useTranslations('news');
  const tCommon = useTranslations('common');
  const pathname = usePathname();

  const title = locale === 'ja' ? post.titleJa : locale === 'en' ? post.titleEn : post.titleZh;
  const body = locale === 'zh-TW' ? post.bodyZh : post.bodyEn;
  const categoryLabel = t(post.category.replace('-', '_') as 'new_flavor' | 'store_opening' | 'collaboration' | 'event');

  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === 'ja' ? 'ja-JP' : locale === 'en' ? 'en-US' : 'zh-TW',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Silently fail
    }
  };

  return (
    <article className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <ScrollReveal>
          <Button href="/news" variant="outline" size="sm" className="mb-8">
            ← {tCommon('back')}
          </Button>
        </ScrollReveal>

        <ScrollReveal>
          <div className="aspect-[21/9] rounded-2xl bg-cream-dark mb-8 overflow-hidden relative">
            <Image
              src={newsImages[post.slug.length % newsImages.length]}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </ScrollReveal>

        {/* Meta */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={categoryBadgeVariant[post.category]}>
              {categoryLabel}
            </Badge>
            <span className="text-xs text-charcoal-muted">{date}</span>
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal>
          <h1 className="font-serif text-3xl md:text-4xl mb-8">{title}</h1>
        </ScrollReveal>

        {/* Body */}
        <ScrollReveal>
          <div className="prose prose-lg max-w-none">
            {body.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-charcoal-muted leading-relaxed mb-6">
                {renderInlineBold(paragraph)}
              </p>
            ))}
          </div>
        </ScrollReveal>

        {/* Share buttons */}
        <ScrollReveal>
          <div className="border-t border-warm-gold/15 mt-12 pt-8">
            <p className="text-xs tracking-[3px] uppercase text-warm-gold mb-4">
              {t('share')}
            </p>
            <div className="flex gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                Facebook
              </a>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                LINE
              </a>
              <button
                onClick={handleCopyLink}
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                Copy link
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
