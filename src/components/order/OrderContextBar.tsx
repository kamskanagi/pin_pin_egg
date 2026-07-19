'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { useCart } from '@/lib/order/CartContext';
import { storeLocations } from '@/lib/placeholder-data';
import { formatPrice } from '@/lib/utils';

export function OrderContextBar() {
  const t = useTranslations('order');
  const locale = useLocale();
  const { storeId, slot, totalTwd, itemCount } = useCart();

  const store = storeLocations.find((s) => s.id === storeId);
  const storeName = store ? (locale === 'ja' ? store.nameJa : locale === 'en' ? store.nameEn : store.nameZh) : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm bg-cream-dark/60 px-5 py-3 text-sm text-charcoal-light mb-10">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {storeName ? (
          <>
            <span className="font-medium text-charcoal">{storeName}</span>
            <Link href="/order" className="text-xs uppercase tracking-[1px] text-warm-gold hover:text-warm-gold-dark transition-colors">
              {t('change_store')}
            </Link>
          </>
        ) : null}
        {slot && (
          <>
            <span className="text-charcoal-muted">·</span>
            <span>{slot}</span>
          </>
        )}
      </div>
      {itemCount > 0 && (
        <Link
          href="/order/cart"
          className="text-xs uppercase tracking-[1.5px] text-charcoal hover:text-warm-gold transition-colors"
        >
          {itemCount} · {formatPrice(totalTwd)}
        </Link>
      )}
    </div>
  );
}
