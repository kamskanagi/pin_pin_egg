'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/lib/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { OrderContextBar } from '@/components/order/OrderContextBar';
import { CartLineList } from '@/components/order/CartLineList';
import { SlotPicker } from '@/components/order/SlotPicker';
import { useCart } from '@/lib/order/CartContext';
import { formatPrice } from '@/lib/utils';

export default function OrderCartPage() {
  const t = useTranslations('order');
  const router = useRouter();
  const { storeId, hydrated, items, slot, totalTwd } = useCart();

  useEffect(() => {
    if (hydrated && !storeId) {
      router.replace('/order');
    }
  }, [hydrated, storeId, router]);

  if (!hydrated || !storeId) return null;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center">
          <ScrollReveal>
            <SectionHeader label={t('page_label')} title={t('cart_title')} />
            <p className="font-serif text-xl mb-2">{t('cart_empty')}</p>
            <p className="text-charcoal-muted mb-8">{t('cart_empty_body')}</p>
            <Button href="/order/menu" variant="gold">
              {t('browse_menu')}
            </Button>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('page_label')} title={t('cart_title')} />
        </ScrollReveal>
        <OrderContextBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 flex flex-col gap-10">
            <CartLineList />
            <SlotPicker />
          </div>

          <div>
            <div className="rounded-xl bg-white p-7 sticky top-32">
              <div className="flex items-center justify-between text-sm text-charcoal-muted mb-2">
                <span>{t('subtotal')}</span>
                <span>{formatPrice(totalTwd)}</span>
              </div>
              <div className="flex items-center justify-between text-base font-medium mb-6 pt-3 border-t border-charcoal/10">
                <span>{t('total')}</span>
                <span className="text-warm-gold-dark">{formatPrice(totalTwd)}</span>
              </div>

              {slot ? (
                <Button href="/order/checkout" variant="gold" className="w-full text-center">
                  {t('continue_to_checkout')}
                </Button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full rounded-sm bg-charcoal/10 px-8 py-3 text-[13px] tracking-[2px] uppercase font-sans font-medium text-charcoal-muted cursor-not-allowed"
                >
                  {t('continue_to_checkout')}
                </button>
              )}

              <Link
                href="/order/menu"
                className="block text-center mt-4 text-xs uppercase tracking-[1px] text-charcoal-muted hover:text-warm-gold transition-colors"
              >
                {t('back_to_menu')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
