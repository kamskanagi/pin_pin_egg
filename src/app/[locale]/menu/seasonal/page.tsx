'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { seasonalItems } from '@/lib/placeholder-data';

export default function SeasonalPage() {
  const t = useTranslations('menu');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('filter_seasonal')} title={t('seasonal')} />
        </ScrollReveal>

        <MenuGrid items={seasonalItems} />
      </div>
    </div>
  );
}
