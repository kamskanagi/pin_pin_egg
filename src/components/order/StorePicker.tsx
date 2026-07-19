'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/order/CartContext';
import { useNow } from '@/lib/order/useNow';
import { isStoreOpenNow } from '@/lib/order/slots';
import { storeLocations } from '@/lib/placeholder-data';

export function StorePicker() {
  const t = useTranslations('order');
  const tLocations = useTranslations('locations');
  const locale = useLocale();
  const router = useRouter();
  const { setStore } = useCart();
  const now = useNow();

  const taiwanStores = storeLocations.filter((s) => s.country === 'taiwan');

  const handleSelect = (storeId: string) => {
    setStore(storeId);
    router.push('/order/menu');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {taiwanStores.map((store) => {
        const name = locale === 'ja' ? store.nameJa : locale === 'en' ? store.nameEn : store.nameZh;
        const address = locale === 'ja' ? store.addressJa : locale === 'en' ? store.addressEn : store.addressZh;
        const hours = locale === 'ja' ? store.hoursJa : locale === 'en' ? store.hoursEn : store.hoursZh;
        const open = now ? isStoreOpenNow(store, now) : null;

        return (
          <div key={store.id} className="rounded-xl bg-white p-7">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-serif text-xl">{name}</h3>
              {open !== null && (
                <span
                  className={cn(
                    'shrink-0 rounded-full px-3 py-1 text-[11px] font-medium tracking-[1px] uppercase',
                    open ? 'bg-accent-matcha/10 text-accent-matcha' : 'bg-charcoal/10 text-charcoal-light'
                  )}
                >
                  {open ? t('store_open') : t('store_closed')}
                </span>
              )}
            </div>
            <p className="text-sm text-charcoal-muted mb-1">{address}</p>
            <p className="text-sm text-charcoal-muted mb-6">
              <span className="text-charcoal-light font-medium">{tLocations('hours')}:</span> {hours}
            </p>
            <button
              type="button"
              onClick={() => handleSelect(store.id)}
              className="w-full rounded-sm bg-warm-gold px-6 py-3 text-[13px] tracking-[1.5px] uppercase font-sans font-medium text-white transition-colors duration-300 hover:bg-warm-gold-dark"
            >
              {t('select_store')}
            </button>
          </div>
        );
      })}
    </div>
  );
}
