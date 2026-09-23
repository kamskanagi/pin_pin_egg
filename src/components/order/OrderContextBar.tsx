'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useCart } from '@/lib/order/CartContext';
import { storeLocations } from '@/lib/placeholder-data';
import { formatPrice } from '@/lib/utils';

export function OrderContextBar() {
  const t = useTranslations('order');
  const locale = useLocale();
  const { storeId, slot, totalTwd, itemCount } = useCart();
  const onCartPage = usePathname() === '/order/cart';

  const store = storeLocations.find((s) => s.id === storeId);
  const storeName = store ? (locale === 'ja' ? store.nameJa : locale === 'en' ? store.nameEn : store.nameZh) : null;

  const rows = [
    storeName ? { label: t('status_store'), value: storeName } : null,
    slot ? { label: t('status_slot'), value: slot } : null,
  ].filter((row): row is { label: string; value: string } => row !== null);

  return (
    <div className="mb-10 border-y border-dotted border-warm-gold/40 py-5">
      <dl className="space-y-2 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline gap-3">
            <dt className="text-[12px] tracking-[1.5px] uppercase text-charcoal">{row.label}</dt>
            <span aria-hidden="true" className="flex-1 min-w-4 border-b border-dotted border-warm-gold/40" />
            <dd className="font-serif italic text-lg text-charcoal">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        {storeName && (
          <Link
            href="/order"
            className="text-[12px] tracking-[1.5px] uppercase text-charcoal-muted underline decoration-dotted decoration-warm-gold/50 underline-offset-8 transition-colors hover:text-warm-gold-dark"
          >
            {t('change_store')}
          </Link>
        )}
        {itemCount > 0 && !onCartPage && (
          <Link
            href="/order/cart"
            className="text-[12px] tracking-[1.5px] uppercase text-charcoal underline decoration-dotted decoration-warm-gold underline-offset-8 transition-colors hover:text-warm-gold-dark"
          >
            {t('view_cart')} · {itemCount} · {formatPrice(totalTwd)}
          </Link>
        )}
      </div>
    </div>
  );
}
