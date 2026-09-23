'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { useCart } from '@/lib/order/CartContext';
import { formatPrice } from '@/lib/utils';

export function CartBar() {
  const t = useTranslations('order');
  const { itemCount, totalTwd } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-dotted border-warm-gold/50 bg-cream/95 backdrop-blur-xl px-6 py-4 md:px-12">
      <Link
        href="/order/cart"
        className="group mx-auto flex max-w-content items-center justify-between gap-4 rounded-full bg-charcoal px-6 py-3 text-white transition-colors hover:bg-charcoal-light"
      >
        <span className="flex items-baseline gap-3">
          <span className="font-serif italic text-2xl font-light leading-none">{itemCount}</span>
          <span className="text-sm text-white/70">{formatPrice(totalTwd)}</span>
        </span>
        <span className="inline-flex items-center gap-2 text-[12px] tracking-[1.5px] uppercase font-medium">
          {t('view_cart')}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </div>
  );
}
