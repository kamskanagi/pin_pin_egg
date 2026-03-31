'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { eggcakeItems } from '@/lib/placeholder-data';

export default function EggcakesPage() {
  const t = useTranslations('menu');
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: t('filter_all') },
    { key: 'classic', label: t('filter_classic') },
    { key: 'seasonal', label: t('filter_seasonal') },
    { key: 'limited', label: t('filter_limited') },
  ];

  const filtered = filter === 'all'
    ? eggcakeItems
    : eggcakeItems.filter((item) => {
        if (filter === 'classic') return item.badges.includes('signature') || item.badges.length === 0;
        return item.badges.includes(filter as 'seasonal' | 'limited');
      });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('eggcakes')} title={t('eggcakes')} />
        </ScrollReveal>

        <CategoryFilter categories={categories} active={filter} onChange={setFilter} />
        <MenuGrid items={filtered} />
      </div>
    </div>
  );
}
