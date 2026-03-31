'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StoreMap } from '@/components/locations/StoreMap';
import { StoreCard } from '@/components/locations/StoreCard';
import { CountryFilter } from '@/components/locations/CountryFilter';
import { storeLocations } from '@/lib/placeholder-data';
import type { Country } from '@/types/location';

export default function LocationsPage() {
  const t = useTranslations('locations');
  const [activeCountry, setActiveCountry] = useState<'all' | Country>('all');

  const filtered = activeCountry === 'all'
    ? storeLocations
    : storeLocations.filter((s) => s.country === activeCountry);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('page_label')} title={t('page_title')} />
        </ScrollReveal>

        <CountryFilter active={activeCountry} onChange={setActiveCountry} />

        <StoreMap stores={storeLocations} activeCountry={activeCountry} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((store, i) => (
            <ScrollReveal key={store.id} delay={i * 0.1}>
              <StoreCard store={store} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
