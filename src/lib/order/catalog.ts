import { orderableItems } from '@/lib/placeholder-data';
import type { MenuCardItem } from '@/components/menu/MenuCard';
import type { CartLineOptions } from '@/types/order';

export function findOrderableItem(itemId: string): MenuCardItem | undefined {
  return orderableItems.find((i) => i.id === itemId);
}

export function formatOptionsSummary(item: MenuCardItem, options: CartLineOptions, locale: string): string {
  const parts: string[] = [];
  for (const group of item.optionGroups ?? []) {
    const selected = options[group.key] ?? [];
    for (const choiceKey of selected) {
      const choice = group.choices.find((c) => c.key === choiceKey);
      if (!choice) continue;
      parts.push(locale === 'ja' ? choice.labelJa : locale === 'en' ? choice.labelEn : choice.labelZh);
    }
  }
  return parts.join(locale === 'en' ? ', ' : '、');
}
