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

/**
 * Strict server-side check: every group and choice key exists in the catalog, no duplicate
 * choices, single-select groups have at most one choice, and required groups are filled.
 */
export function isOptionsValid(item: MenuCardItem, options: CartLineOptions): boolean {
  const groups = item.optionGroups ?? [];
  for (const [groupKey, selected] of Object.entries(options)) {
    const group = groups.find((g) => g.key === groupKey);
    if (!group) return false;
    if (new Set(selected).size !== selected.length) return false;
    if (!group.multiple && selected.length > 1) return false;
    if (!selected.every((key) => group.choices.some((c) => c.key === key))) return false;
  }
  return isOptionsComplete(item, options);
}
