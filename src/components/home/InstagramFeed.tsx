'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLink } from '@/components/ui/TextLink';

const igImages = [
  '/images/instagram/ig-01.jpg',
  '/images/instagram/ig-02.jpg',
  '/images/instagram/ig-03.jpg',
  '/images/instagram/ig-04.jpg',
  '/images/instagram/ig-05.jpg',
  '/images/instagram/ig-06.jpg',
];

export function InstagramFeed() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    <section className="py-24 px-6 md:px-12 bg-cream-dark/50">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader
            label={t('instagram_label')}
            title={t('instagram_title')}
          />
        </ScrollReveal>

        {/* Placeholder grid — replace with live feed in v2 */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {igImages.map((src, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="aspect-square rounded-sm bg-cream-dark overflow-hidden relative group">
                <Image
                  src={src}
                  alt={`Pin Pin Café Instagram ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, 16vw"
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
