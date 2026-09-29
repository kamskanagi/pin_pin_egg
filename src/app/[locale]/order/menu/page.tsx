'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/navigation';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { OrderContextBar } from '@/components/order/OrderContextBar';
import { OrderMenuList, useOrderMenuSections } from '@/components/order/OrderMenuList';
import { CartBar } from '@/components/order/CartBar';
import { useCart } from '@/lib/order/CartContext';

export default function OrderMenuPage() {
  const t = useTranslations('order');
  const tMenu = useTranslations('menu');
  const router = useRouter();
  const { storeId, hydrated } = useCart();
  const sections = useOrderMenuSections();

  useEffect(() => {
    if (hydrated && !storeId) {
      router.replace('/order');
    }
  }, [hydrated, storeId, router]);

  if (!hydrated || !storeId) return null;

  return (
    <div className="pt-32 pb-40 px-6 md:px-12">
      <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs tracking-[4px] uppercase text-warm-gold mb-4">{t('page_label')}</p>
            <MaskedHeading
              as="h1"
              text={t('menu_title')}
              className="font-serif italic text-4xl md:text-5xl font-light leading-[1.05] [:lang(ja)_&]:leading-[1.3] [:lang(zh-TW)_&]:leading-[1.3] mb-5"
            />
            <p className="text-charcoal-muted leading-relaxed mb-3 max-w-sm">{t('menu_intro')}</p>
            <p className="text-sm text-charcoal-muted mb-8 max-w-sm">{tMenu('combo_note')}</p>

            <OrderContextBar />

            <nav aria-label={t('jump_to')} className="hidden lg:block">
              <p className="font-serif italic text-2xl mb-3">{t('jump_to')}</p>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.key}>
                    <a
                      href={`#${section.key}`}
                      className="text-[13px] tracking-[1.5px] uppercase text-charcoal-muted underline-offset-8 decoration-dotted decoration-warm-gold transition-colors hover:text-charcoal hover:underline"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-8 lg:pt-2">
          <OrderMenuList sections={sections} />
        </div>
      </div>
      <CartBar />
    </div>
  );
}
