'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/order/CartContext';
import { defaultOptionsFor, computeUnitPriceTwd, isOptionsComplete } from '@/lib/order/pricing';
import type { MenuCardItem } from '@/components/menu/MenuCard';
import type { CartLineOptions } from '@/types/order';

interface OrderMenuItemProps {
  item: MenuCardItem;
}

export function OrderMenuItem({ item }: OrderMenuItemProps) {
  const t = useTranslations('order');
  const locale = useLocale();
  const { addItem } = useCart();

  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<CartLineOptions>(() => defaultOptionsFor(item));
  const [justAdded, setJustAdded] = useState(false);

  const name = locale === 'ja' ? item.nameJa : locale === 'en' ? item.nameEn : item.nameZh;
  const unitPrice = computeUnitPriceTwd(item, options);
  const complete = isOptionsComplete(item, options);

  const selectChoice = (groupKey: string, choiceKey: string, multiple: boolean) => {
    setOptions((prev) => {
      const current = prev[groupKey] ?? [];
      if (!multiple) return { ...prev, [groupKey]: [choiceKey] };
      const next = current.includes(choiceKey)
        ? current.filter((k) => k !== choiceKey)
        : [...current, choiceKey];
      return { ...prev, [groupKey]: next };
    });
  };

  const handleAdd = () => {
    if (!complete) return;
    addItem({ itemId: item.id, quantity, options, unitPriceTwd: unitPrice });
    setJustAdded(true);
    setExpanded(false);
    setQuantity(1);
    setOptions(defaultOptionsFor(item));
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="rounded-xl bg-white p-5 flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-4 text-left w-full"
        aria-expanded={expanded}
      >
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-cream-dark">
          {item.image && (
            <Image src={item.image} alt={name} fill className="object-cover" sizes="80px" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-serif text-lg truncate">{name}</h4>
          <p className="mt-1 text-sm tracking-wide font-medium text-warm-gold-dark">
            {formatPrice(item.priceTwd)}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            'shrink-0 text-charcoal-muted transition-transform duration-300',
            expanded && 'rotate-45'
          )}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>

      {expanded && (
        <div className="border-t border-charcoal/10 pt-4 flex flex-col gap-5">
          {(item.optionGroups ?? []).map((group) => {
            const groupLabel = locale === 'ja' ? group.labelJa : locale === 'en' ? group.labelEn : group.labelZh;
            const selected = options[group.key] ?? [];
            return (
              <div key={group.key}>
                <p className="text-xs tracking-[2px] uppercase text-charcoal-light mb-2">{groupLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {group.choices.map((choice) => {
                    const choiceLabel =
                      locale === 'ja' ? choice.labelJa : locale === 'en' ? choice.labelEn : choice.labelZh;
                    const active = selected.includes(choice.key);
                    return (
                      <button
                        key={choice.key}
                        type="button"
                        onClick={() => selectChoice(group.key, choice.key, group.multiple)}
                        className={cn(
                          'rounded-sm px-4 py-2 text-[13px] transition-all duration-300 border',
                          active
                            ? 'bg-charcoal text-white border-charcoal'
                            : 'text-charcoal-muted border-charcoal/10 hover:border-charcoal/30'
                        )}
                      >
                        {choiceLabel}
                        {choice.priceDeltaTwd ? ` +${formatPrice(choice.priceDeltaTwd)}` : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-9 w-9 rounded-sm border border-charcoal/15 text-charcoal hover:border-charcoal/40 transition-colors"
                aria-label="-"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="h-9 w-9 rounded-sm border border-charcoal/15 text-charcoal hover:border-charcoal/40 transition-colors"
                aria-label="+"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!complete}
              className={cn(
                'rounded-sm px-6 py-2.5 text-[13px] tracking-[1.5px] uppercase font-sans font-medium transition-colors duration-300',
                complete
                  ? 'bg-warm-gold text-white hover:bg-warm-gold-dark'
                  : 'bg-charcoal/10 text-charcoal-muted cursor-not-allowed'
              )}
            >
              {t('add_to_cart')} · {formatPrice(unitPrice * quantity)}
            </button>
          </div>
          {!complete && (
            <p className="text-xs text-accent-coral -mt-2">{t('options_incomplete')}</p>
          )}
        </div>
      )}

      {justAdded && (
        <p className="text-xs text-accent-matcha font-medium" role="status">
          ✓ {t('added')}
        </p>
      )}
    </div>
  );
}
