'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/order/CartContext';
import { defaultOptionsFor, computeUnitPriceTwd, isOptionsComplete } from '@/lib/order/pricing';
import type { MenuCardItem } from '@/components/menu/MenuCard';
import { filterTabClassName } from '@/components/menu/CategoryFilter';
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

  const subName = locale === 'zh-TW' ? item.nameEn : item.nameZh;
  const panelId = `order-item-${item.id}`;

  return (
    <div className="py-5">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="group flex w-full items-center gap-4 text-left"
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-cream-dark">
          {item.image && (
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="64px"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <span className="text-[13px] tracking-[1px] uppercase text-charcoal">{name}</span>
            <span aria-hidden="true" className="flex-1 min-w-4 border-b border-dotted border-warm-gold/40" />
            <span className="text-sm tracking-wide font-medium text-warm-gold-dark">{formatPrice(item.priceTwd)}</span>
          </div>
          <p className="mt-1 font-serif-tc text-sm text-charcoal-muted">{subName}</p>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-all duration-300 group-hover:border-charcoal',
            expanded && 'rotate-45 bg-charcoal text-white border-charcoal'
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>

      {expanded && (
        <div id={panelId} className="mt-5 ml-0 sm:ml-20 flex flex-col gap-5">
          {(item.optionGroups ?? []).map((group) => {
            const groupLabel = locale === 'ja' ? group.labelJa : locale === 'en' ? group.labelEn : group.labelZh;
            const selected = options[group.key] ?? [];
            return (
              <fieldset key={group.key}>
                <legend className="font-serif italic text-xl mb-1">{groupLabel}</legend>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {group.choices.map((choice) => {
                    const choiceLabel =
                      locale === 'ja' ? choice.labelJa : locale === 'en' ? choice.labelEn : choice.labelZh;
                    const active = selected.includes(choice.key);
                    return (
                      <button
                        key={choice.key}
                        type="button"
                        aria-pressed={active}
                        onClick={() => selectChoice(group.key, choice.key, group.multiple)}
                        className={filterTabClassName(active)}
                      >
                        {choiceLabel}
                        {choice.priceDeltaTwd ? ` +${formatPrice(choice.priceDeltaTwd)}` : ''}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dotted border-warm-gold/40 pt-5">
            <div className="flex items-center gap-4" role="group" aria-label={t('quantity')}>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-charcoal"
                aria-label={t('decrease')}
              >
                −
              </button>
              <span className="w-6 text-center font-serif italic text-2xl" aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-charcoal"
                aria-label={t('increase')}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!complete}
              className={cn(
                'group inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-[12px] tracking-[1.5px] uppercase font-sans font-medium transition-colors duration-300',
                complete
                  ? 'border-charcoal bg-charcoal text-white hover:bg-transparent hover:text-charcoal'
                  : 'border-charcoal/10 text-charcoal-muted cursor-not-allowed'
              )}
            >
              {t('add_to_cart')} · {formatPrice(unitPrice * quantity)}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </button>
          </div>
          {!complete && (
            <p className="text-xs text-accent-coral -mt-2">{t('options_incomplete')}</p>
          )}
        </div>
      )}

      {justAdded && (
        <p className="mt-3 sm:ml-20 text-[12px] tracking-[1.5px] uppercase text-accent-matcha" role="status">
          ✓ {t('added')}
        </p>
      )}
    </div>
  );
}
