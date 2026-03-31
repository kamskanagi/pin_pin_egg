'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function InstagramFeed() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader
            label={t('instagram_label')}
            title={t('instagram_title')}
          />
        </ScrollReveal>

        {/* Placeholder grid — replace with live feed in v2 */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="aspect-square rounded-lg bg-cream-dark overflow-hidden flex items-center justify-center group cursor-pointer">
                <span className="font-serif-tc text-2xl text-charcoal-muted/15 group-hover:text-warm-gold/30 transition-colors duration-300">
                  品
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/pinpin_eggcake/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-[1.5px] text-warm-gold hover:text-warm-gold-dark transition-colors"
            >
              {tCommon('follow_instagram')}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
