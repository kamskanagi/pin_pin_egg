'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { NewsGrid } from '@/components/news/NewsGrid';
import { newsPosts } from '@/lib/placeholder-data';
import type { NewsCategory } from '@/types/news';

export function NewsListing() {
  const t = useTranslations('news');
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: t('all') },
    { key: 'new-flavor', label: t('new_flavor') },
    { key: 'store-opening', label: t('store_opening') },
    { key: 'collaboration', label: t('collaboration') },
    { key: 'event', label: t('event') },
  ];

  const filtered = filter === 'all'
    ? newsPosts
    : newsPosts.filter((p) => p.category === (filter as NewsCategory));

  return (
    <>
      <CategoryFilter categories={categories} active={filter} onChange={setFilter} />
      <NewsGrid posts={filtered} />
    </>
  );
}
