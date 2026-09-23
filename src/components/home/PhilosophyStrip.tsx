'use client';

import { useTranslations } from 'next-intl';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLink } from '@/components/ui/TextLink';

export function PhilosophyStrip() {
  const t = useTranslations('home');

  return (
    <section className="py-24 px-6 md:px-12 bg-cream-dark/50">
      <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Giant 品 character */}
        <ScrollReveal direction="left">
          <div className="flex items-center justify-center md:justify-end">
            <span className="font-serif-tc text-[clamp(120px,20vw,240px)] font-light text-warm-gold-light/40 leading-none select-none">
              品
            </span>
          </div>
        </ScrollReveal>

        {/* Brand story */}
        <div>
          <p className="text-xs tracking-[4px] uppercase text-warm-gold mb-4">
            {t('philosophy_label')}
          </p>
          <MaskedHeading
            text={t('philosophy_title')}
            className="font-serif italic text-4xl md:text-5xl font-light mb-6"
          />
          <ScrollReveal delay={0.15}>
            <p className="text-charcoal-muted leading-relaxed mb-8">
              {t('philosophy_body')}
            </p>
            <TextLink href="/about">{t('philosophy_link')}</TextLink>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
