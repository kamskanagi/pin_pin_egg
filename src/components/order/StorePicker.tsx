'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLinkLabel } from '@/components/ui/TextLink';
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
      {taiwanStores.map((store, i) => {
        const name = locale === 'ja' ? store.nameJa : locale === 'en' ? store.nameEn : store.nameZh;
        const address = locale === 'ja' ? store.addressJa : locale === 'en' ? store.addressEn : store.addressZh;
        const city = locale === 'ja' ? store.cityJa : locale === 'en' ? store.cityEn : store.cityZh;
        const hours = locale === 'ja' ? store.hoursJa : locale === 'en' ? store.hoursEn : store.hoursZh;
        const open = now ? isStoreOpenNow(store, now) : null;

        return (
          <ScrollReveal key={store.id} delay={i * 0.1}>
            <article>
              <button
                type="button"
                onClick={() => handleSelect(store.id)}
                className="group block w-full text-left"
              >
                <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-sm bg-cream-dark">
                  <ImageWithFallback
                    src={`/images/locations/${store.id}.jpg`}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    fallbackClassName="absolute inset-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-[11px] tracking-[3px] uppercase text-warm-gold">
                    {tLocations('taiwan')} · {city}
                  </p>
                  {open !== null && (
                    <span
                      className={cn(
                        'shrink-0 text-[11px] tracking-[1.5px] uppercase underline decoration-dotted underline-offset-4',
                        open ? 'text-accent-matcha decoration-accent-matcha/50' : 'text-charcoal-muted decoration-charcoal/30'
                      )}
                    >
                      {open ? t('store_open') : t('store_closed')}
                    </span>
                  )}
                </div>

                <h2 className="font-serif italic text-3xl font-light mb-4 transition-colors duration-300 group-hover:text-warm-gold-dark">
                  {name}
                </h2>
                <p className="text-sm text-charcoal-muted leading-relaxed mb-4">{address}</p>

                <div className="flex items-baseline gap-3 text-sm mb-6">
                  <span className="text-[12px] tracking-[1.5px] uppercase text-charcoal">{tLocations('hours')}</span>
                  <span aria-hidden="true" className="flex-1 min-w-4 border-b border-dotted border-warm-gold/40" />
                  <span className="text-charcoal-muted">{hours}</span>
                </div>

                <TextLinkLabel>{t('select_store')}</TextLinkLabel>
              </button>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
