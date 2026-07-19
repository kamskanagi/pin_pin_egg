'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import type { PlaceholderStore } from '@/lib/placeholder-data';

interface StoreCardProps {
  store: PlaceholderStore;
}

export function StoreCard({ store }: StoreCardProps) {
  const locale = useLocale();
  const t = useTranslations('locations');

  const name = locale === 'ja' ? store.nameJa : locale === 'en' ? store.nameEn : store.nameZh;
  const address = locale === 'ja' ? store.addressJa : locale === 'en' ? store.addressEn : store.addressZh;
  const city = locale === 'ja' ? store.cityJa : locale === 'en' ? store.cityEn : store.cityZh;
  const hours = locale === 'ja' ? store.hoursJa : locale === 'en' ? store.hoursEn : store.hoursZh;
  const transit = locale === 'ja' ? store.transitJa : locale === 'en' ? store.transitEn : store.transitZh;

  return (
    <div
      className={cn(
        'rounded-xl bg-white p-7 transition-all duration-300 hover:shadow-lg',
        store.country === 'japan' && 'border border-warm-gold/30'
      )}
    >
      <div className="aspect-[16/9] rounded-lg bg-cream-dark mb-5 overflow-hidden relative">
        <ImageWithFallback
          src={`/images/locations/${store.id}.jpg`}
          alt={name}
          fill
          className="object-cover"
          fallbackClassName="absolute inset-0"
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
          <p className="flex items-center gap-1.5 text-xs">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 text-warm-gold-dark"
            >
              <rect x="5" y="3" width="14" height="14" rx="3" />
              <line x1="5" y1="11" x2="19" y2="11" />
              <circle cx="9" cy="14" r="0.5" />
              <circle cx="15" cy="14" r="0.5" />
              <path d="M8 20l-1.5 2M16 20l1.5 2" />
            </svg>
            {transit}
          </p>
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
