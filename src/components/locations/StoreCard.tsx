'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { TextLink } from '@/components/ui/TextLink';
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

  const rows: { label: string; value: string }[] = [{ label: t('hours'), value: hours }];

  return (
    <article>
      <div className="aspect-[16/10] rounded-sm bg-cream-dark mb-6 overflow-hidden relative group">
        <ImageWithFallback
          src={`/images/locations/${store.id}.jpg`}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          fallbackClassName="absolute inset-0"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <p className="text-[11px] tracking-[3px] uppercase text-warm-gold mb-2">
        {store.country === 'japan' ? t('japan') : t('taiwan')} · {city}
      </p>

      <h3 className="font-serif italic text-3xl font-light mb-4">{name}</h3>

      <p className="text-sm text-charcoal-muted leading-relaxed mb-4">{address}</p>

      <dl className="space-y-2 text-sm mb-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline gap-3">
            <dt className="text-[12px] tracking-[1.5px] uppercase text-charcoal">{row.label}</dt>
            <span aria-hidden="true" className="flex-1 min-w-4 border-b border-dotted border-warm-gold/40" />
            <dd className="text-charcoal-muted">{row.value}</dd>
          </div>
        ))}
      </dl>

      {transit && (
        <p className="flex items-center gap-1.5 text-xs text-charcoal-muted mb-2">
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
        <p className="text-xs text-warm-gold mb-2">{store.instagramHandle}</p>
      )}

      <TextLink href={store.googleMapsUrl} className="mt-4">
        {t('get_directions')}
      </TextLink>
    </article>
  );
}
