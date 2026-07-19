'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { OrderContextBar } from '@/components/order/OrderContextBar';
import { OrderMenuList } from '@/components/order/OrderMenuList';
import { CartBar } from '@/components/order/CartBar';
import { useCart } from '@/lib/order/CartContext';

export default function OrderMenuPage() {
  const t = useTranslations('order');
  const router = useRouter();
  const { storeId, hydrated } = useCart();

  useEffect(() => {
    if (hydrated && !storeId) {
      router.replace('/order');
    }
  }, [hydrated, storeId, router]);

  if (!hydrated || !storeId) return null;

  return (
    <div className="pt-32 pb-32 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('page_label')} title={t('menu_title')} />
        </ScrollReveal>
        <OrderContextBar />
        <OrderMenuList />
      </div>
      <CartBar />
    </div>
  );
}
