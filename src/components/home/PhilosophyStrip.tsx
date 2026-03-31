'use client';

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function PhilosophyStrip() {
  const t = useTranslations('home');

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
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
        <ScrollReveal delay={0.15}>
          <div>
            <p className="text-xs tracking-[4px] uppercase text-warm-gold mb-4">
              {t('philosophy_label')}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              {t('philosophy_title')}
            </h2>
            <p className="text-charcoal-muted leading-relaxed">
              {t('philosophy_body')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
