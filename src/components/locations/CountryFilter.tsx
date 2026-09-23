'use client';

import { useTranslations } from 'next-intl';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import type { Country } from '@/types/location';

interface CountryFilterProps {
  active: 'all' | Country;
  onChange: (value: 'all' | Country) => void;
}

export function CountryFilter({ active, onChange }: CountryFilterProps) {
  const t = useTranslations('locations');

  const filters: { key: 'all' | Country; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'taiwan', label: t('taiwan') },
    { key: 'japan', label: t('japan') },
  ];

  return <CategoryFilter categories={filters} active={active} onChange={onChange} />;
}
