'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
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

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={cn(
            'px-5 py-2 text-[13px] tracking-[1.5px] uppercase font-sans rounded-sm transition-all duration-300',
            active === f.key
              ? 'bg-charcoal text-white'
              : 'text-charcoal-muted hover:text-charcoal border border-charcoal/10 hover:border-charcoal/30'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
