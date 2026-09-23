'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Link } from '@/lib/i18n/navigation';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { WavyDivider } from '@/components/ui/WavyDivider';
import type { PlaceholderNewsPost } from '@/lib/placeholder-data';

const newsImages = [
  '/images/news/news-01.jpg',
  '/images/news/news-02.jpg',
  '/images/news/news-03.jpg',
];

interface ArticleContentProps {
  post: PlaceholderNewsPost;
}


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

  const [copied, setCopied] = useState(false);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      // Silently fail
    }
  };

  return (
    <article className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/news"
          className="inline-flex mb-10 text-[13px] tracking-[1.5px] uppercase text-charcoal-muted underline decoration-dotted decoration-warm-gold/50 underline-offset-8 transition-colors hover:text-warm-gold"
        >
          ← {t('back_to_news')}
        </Link>

        {/* Meta */}
        <p className="text-[11px] tracking-[3px] uppercase text-warm-gold mb-4">
          {categoryLabel} · <time dateTime={post.publishedAt}>{date}</time>
        </p>

        {/* Title */}
        <MaskedHeading
          as="h1"
          text={title}
          className="font-serif italic text-4xl md:text-5xl font-light leading-tight [:lang(ja)_&]:leading-[1.4] [:lang(zh-TW)_&]:leading-[1.4] mb-10"
        />

        <ParallaxImage
          src={newsImages[post.slug.length % newsImages.length]}
          alt={title}
          aspect="aspect-[16/9]"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
          className="rounded-sm mb-12"
        />

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
          <div className="mt-12">
            <WavyDivider className="mb-8" />
            <p className="font-serif italic text-2xl mb-4">
              {t('share')}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
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
                type="button"
                onClick={handleCopyLink}
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                aria-live="polite"
              >
                {copied ? t('link_copied') : t('copy_link')}
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
