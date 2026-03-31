'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { NewsGrid } from '@/components/news/NewsGrid';
import { newsPosts } from '@/lib/placeholder-data';
import type { NewsCategory } from '@/types/news';

export default function NewsPage() {
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
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('page_label')} title={t('page_title')} />
        </ScrollReveal>

        <CategoryFilter categories={categories} active={filter} onChange={setFilter} />
        <NewsGrid posts={filtered} />
      </div>
    </div>
  );
}
