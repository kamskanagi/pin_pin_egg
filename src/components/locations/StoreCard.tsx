'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { PlaceholderStore } from '@/lib/placeholder-data';

const storeImages: Record<string, string> = {
  'mitsui-outlet': '/images/locations/store-taichung.jpg',
  'taichung-lalaport': '/images/locations/store-kaohsiung.jpg',
  'nangang-lalaport': '/images/locations/store-osaka.jpg',
  'tokyo-nakameguro': '/images/locations/store-tokyo.jpg',
};

interface StoreCardProps {
  store: PlaceholderStore;
}

export function StoreCard({ store }: StoreCardProps) {
  const locale = useLocale();
  const t = useTranslations('locations');

  const name = locale === 'ja' ? store.nameJa : locale === 'en' ? store.nameEn : store.nameZh;
  const address = locale === 'ja' ? store.addressJa : locale === 'en' ? store.addressEn : store.addressZh;
  const city = locale === 'en' ? store.cityEn : store.cityZh;
  const hours = locale === 'en' ? store.hoursEn : store.hoursZh;
  const transit = locale === 'en' ? store.transitEn : store.transitZh;

  return (
    <div
      className={cn(
        'rounded-xl bg-white p-7 transition-all duration-300 hover:shadow-lg',
        store.country === 'japan' && 'border border-warm-gold/30'
      )}
    >
      <div className="aspect-[16/9] rounded-lg bg-cream-dark mb-5 overflow-hidden relative">
        <Image
          src={storeImages[store.id] || '/images/locations/store-taichung.jpg'}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Country label */}
      <p className="text-[10px] tracking-[3px] uppercase text-warm-gold mb-2">
        {store.country === 'japan' ? t('japan') : t('taiwan')} · {city}
      </p>

      <h3 className="font-serif text-xl mb-3">{name}</h3>

      <div className="space-y-2 text-sm text-charcoal-muted">
        <p>{address}</p>
        <p>
          <span className="text-charcoal-light font-medium">{t('hours')}:</span>{' '}
          {hours}
        </p>
        {transit && (
          <p className="text-xs">🚇 {transit}</p>
        )}
        {store.instagramHandle && (
          <p className="text-xs text-warm-gold">{store.instagramHandle}</p>
        )}
      </div>

      <a
        href={store.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-[13px] tracking-[1.5px] uppercase text-charcoal hover:text-warm-gold transition-colors"
      >
        {t('get_directions')} →
      </a>
    </div>
  );
}
