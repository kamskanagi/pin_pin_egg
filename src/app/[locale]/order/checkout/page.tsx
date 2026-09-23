'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { OrderContextBar } from '@/components/order/OrderContextBar';
import { CheckoutForm } from '@/components/order/CheckoutForm';
import { useCart } from '@/lib/order/CartContext';

export default function OrderCheckoutPage() {
  const t = useTranslations('order');
  const router = useRouter();
  const { storeId, slot, items, hydrated } = useCart();

  useEffect(() => {
    if (!hydrated) return;
    if (!storeId) {
      router.replace('/order');
    } else if (items.length === 0 || !slot) {
      router.replace('/order/cart');
    }
  }, [hydrated, storeId, slot, items.length, router]);

  if (!hydrated || !storeId || items.length === 0 || !slot) return null;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="mx-auto max-w-[640px]">
        <ScrollReveal>
          <SectionHeader as="h1" label={t('page_label')} title={t('checkout_title')} />
        </ScrollReveal>
        <OrderContextBar />
        <CheckoutForm />
      </div>
    </div>
  );
}
