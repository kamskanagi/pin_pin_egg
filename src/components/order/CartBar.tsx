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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-gold/15 bg-cream/95 backdrop-blur-xl px-6 py-4 md:px-12">
      <Link
        href="/order/cart"
        className="mx-auto flex max-w-content items-center justify-between rounded-sm bg-charcoal px-6 py-3.5 text-white transition-colors hover:bg-charcoal-light"
      >
        <span className="text-sm">
          {itemCount} · {formatPrice(totalTwd)}
        </span>
        <span className="text-[13px] tracking-[1.5px] uppercase font-medium">{t('view_cart')} →</span>
      </Link>
    </div>
  );
}
