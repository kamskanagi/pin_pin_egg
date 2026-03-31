'use client';

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';

export function CtaBanner() {
  const t = useTranslations('home');

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-warm-gold to-warm-gold-dark">
      <div className="max-w-content mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {t('cta_title')}
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            {t('cta_subtitle')}
          </p>
          <Button href="/locations" variant="white">
            {t('view_locations')}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
