import type { MenuCardItem } from '@/components/menu/MenuCard';
import type { CartLineOptions } from '@/types/order';

export function defaultOptionsFor(item: MenuCardItem): CartLineOptions {
  const options: CartLineOptions = {};
  for (const group of item.optionGroups ?? []) {
    if (group.required && group.choices.length > 0) {
      options[group.key] = [group.choices[0].key];
    }
  }
  return options;
}

export function computeUnitPriceTwd(item: MenuCardItem, options: CartLineOptions): number {
  let total = item.priceTwd;
  for (const group of item.optionGroups ?? []) {
    const selected = options[group.key] ?? [];
    for (const choiceKey of selected) {
      const choice = group.choices.find((c) => c.key === choiceKey);
      if (choice?.priceDeltaTwd) total += choice.priceDeltaTwd;
    }
  }
  return total;
}

export function isOptionsComplete(item: MenuCardItem, options: CartLineOptions): boolean {
  return (item.optionGroups ?? [])
    .filter((g) => g.required)
    .every((g) => (options[g.key] ?? []).length > 0);
}
