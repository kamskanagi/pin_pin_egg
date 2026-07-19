'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/order/CartContext';
import { findOrderableItem, formatOptionsSummary } from '@/lib/order/catalog';

export function CartLineList() {
  const t = useTranslations('order');
  const locale = useLocale();
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <div className="flex flex-col gap-4">
      {items.map((line) => {
        const item = findOrderableItem(line.itemId);
        if (!item) return null;
        const name = locale === 'ja' ? item.nameJa : locale === 'en' ? item.nameEn : item.nameZh;
        const optionsSummary = formatOptionsSummary(item, line.options, locale);

        return (
          <div key={line.cartItemId} className="flex items-center gap-4 rounded-xl bg-white p-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream-dark">
              {item.image && <Image src={item.image} alt={name} fill className="object-cover" sizes="64px" />}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-serif text-base truncate">{name}</h4>
              {optionsSummary && <p className="text-xs text-charcoal-muted mt-0.5">{optionsSummary}</p>}
              <p className="text-sm tracking-wide font-medium text-warm-gold-dark mt-1">
                {formatPrice(line.unitPriceTwd * line.quantity)}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => updateQuantity(line.cartItemId, line.quantity - 1)}
                className="h-8 w-8 rounded-sm border border-charcoal/15 text-charcoal hover:border-charcoal/40 transition-colors"
                aria-label="-"
              >
                −
              </button>
              <span className="w-5 text-center text-sm font-medium">{line.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(line.cartItemId, line.quantity + 1)}
                className="h-8 w-8 rounded-sm border border-charcoal/15 text-charcoal hover:border-charcoal/40 transition-colors"
                aria-label="+"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItem(line.cartItemId)}
              className="shrink-0 text-xs uppercase tracking-[1px] text-charcoal-muted hover:text-accent-coral transition-colors"
            >
              {t('remove')}
            </button>
          </div>
        );
      })}
    </div>
  );
}
