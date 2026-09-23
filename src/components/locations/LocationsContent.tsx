'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StoreMap } from '@/components/locations/StoreMap';
import { StoreCard } from '@/components/locations/StoreCard';
import { CountryFilter } from '@/components/locations/CountryFilter';
import { storeLocations } from '@/lib/placeholder-data';
import type { Country } from '@/types/location';

export function LocationsContent() {
  const [activeCountry, setActiveCountry] = useState<'all' | Country>('all');

  const filtered = activeCountry === 'all'
    ? storeLocations
    : storeLocations.filter((s) => s.country === activeCountry);

  return (
    <>
      <CountryFilter active={activeCountry} onChange={setActiveCountry} />

      <StoreMap stores={storeLocations} activeCountry={activeCountry} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {filtered.map((store, i) => (
          <ScrollReveal key={store.id} delay={i * 0.1}>
            <StoreCard store={store} />
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
