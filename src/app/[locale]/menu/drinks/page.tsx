'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { teaItems, coffeeItems } from '@/lib/placeholder-data';

export default function DrinksPage() {
  const t = useTranslations('menu');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('drinks')} title={t('drinks')} />
        </ScrollReveal>

        {/* Tea section */}
        <div className="mb-16">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-3xl block mb-2">🍵</span>
              <h3 className="font-serif text-xl text-charcoal-muted">
                {t('tea_collection') ?? 'Tea Collection'}
              </h3>
            </div>
          </ScrollReveal>
          <MenuGrid items={teaItems} />
        </div>

        {/* Coffee section */}
        <div>
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-3xl block mb-2">☕</span>
              <h3 className="font-serif text-xl text-charcoal-muted">
                {t('coffee_selection') ?? 'Coffee Selection'}
              </h3>
            </div>
          </ScrollReveal>
          <MenuGrid items={coffeeItems} />
        </div>
      </div>
    </div>
  );
}
