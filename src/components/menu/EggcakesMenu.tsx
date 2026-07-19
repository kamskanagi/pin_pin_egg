'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { eggcakeItems } from '@/lib/placeholder-data';

export function EggcakesMenu() {
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
    <>
      <CategoryFilter categories={categories} active={filter} onChange={setFilter} />
      <MenuGrid items={filtered} />
    </>
  );
}
