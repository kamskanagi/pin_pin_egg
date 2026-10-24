'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/utils';

// Real posts from @pinpin_eggcake. The storefront comes first because on
// phones it spans both columns, and it is the only landscape photo.
const igImages = [
  { src: '/images/instagram/pinpin-nangang-front.jpg', altKey: 'instagram_alt_nangang' },
  { src: '/images/instagram/pinpin-strawberry-sakura.jpg', altKey: 'instagram_alt_strawberry' },
  { src: '/images/instagram/pinpin-halloween.jpg', altKey: 'instagram_alt_halloween' },
  { src: '/images/instagram/pinpin-eggcake-float.jpg', altKey: 'instagram_alt_float' },
  { src: '/images/instagram/pinpin-birthday.jpg', altKey: 'instagram_alt_birthday' },
] as const;

export function InstagramFeed() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    <section className="py-24 px-6 md:px-12 bg-cream-dark/50">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader title={t('instagram_title')} />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {igImages.map((image, i) => (
            <ScrollReveal key={image.src} delay={i * 0.08} className={i === 0 ? 'col-span-2 md:col-span-1' : undefined}>
              <div
                className={cn(
                  'aspect-square rounded-sm bg-cream-dark overflow-hidden relative group',
                  i === 0 && 'aspect-[2/1] md:aspect-square',
                )}
              >
                <Image
                  src={image.src}
                  alt={t(image.altKey)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes={i === 0 ? '(max-width: 768px) 100vw, 20vw' : '(max-width: 768px) 50vw, 20vw'}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-10">
            <TextLink href="https://www.instagram.com/pinpin_eggcake/">
              {tCommon('follow_instagram')}
            </TextLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
