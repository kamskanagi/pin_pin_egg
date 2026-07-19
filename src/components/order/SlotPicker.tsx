'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/order/CartContext';
import { useNow } from '@/lib/order/useNow';
import { generateSlotsForToday } from '@/lib/order/slots';
import { storeLocations } from '@/lib/placeholder-data';

export function SlotPicker() {
  const t = useTranslations('order');
  const { storeId, slot, setSlot } = useCart();
  const now = useNow();

  const store = storeLocations.find((s) => s.id === storeId);
  if (!store || !now) return null;

  const slots = generateSlotsForToday(store, now);

  return (
    <div>
      <h3 className="font-serif text-xl mb-4">{t('pickup_time_title')}</h3>
      {slots.length === 0 ? (
        <p className="text-sm text-charcoal-muted">{t('no_slots')}</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.map((s) => (
            <button
              key={s.time}
              type="button"
              disabled={!s.available}
              onClick={() => setSlot(s.time)}
              className={cn(
                'rounded-sm px-3 py-2.5 text-sm transition-colors duration-300 border',
                !s.available && 'cursor-not-allowed border-charcoal/5 text-charcoal-muted/40 line-through',
                s.available && slot === s.time && 'bg-charcoal text-white border-charcoal',
                s.available && slot !== s.time && 'border-charcoal/15 text-charcoal hover:border-charcoal/40'
              )}
            >
              {s.time}
              {!s.available && <span className="block text-[10px] tracking-wide">{t('slot_full')}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
