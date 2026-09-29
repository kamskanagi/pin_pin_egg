'use client';

import { useTranslations } from 'next-intl';
import { WavyDivider } from '@/components/ui/WavyDivider';
import { eggcakeItems, teaItems, caffeineFreeItems, milkItems } from '@/lib/placeholder-data';
import type { MenuCardItem } from '@/components/menu/MenuCard';
import { OrderMenuItem } from './OrderMenuItem';

export interface OrderMenuSection {
  key: string;
  label: string;
  items: MenuCardItem[];
}

export function useOrderMenuSections(): OrderMenuSection[] {
  const t = useTranslations('menu');
  return [
    { key: 'eggcakes', label: t('eggcakes'), items: eggcakeItems },
    { key: 'drinks-tea', label: t('tea_collection'), items: teaItems },
    { key: 'drinks-milk', label: t('milk_series'), items: milkItems },
    { key: 'drinks-caffeine-free', label: t('caffeine_free'), items: caffeineFreeItems },
  ];
}

interface OrderMenuListProps {
  sections: OrderMenuSection[];
}

export function OrderMenuList({ sections }: OrderMenuListProps) {
  return (
    <div className="flex flex-col">
      {sections.map((section, i) => (
        <section key={section.key} id={section.key} className="scroll-mt-28">
          {i > 0 && <WavyDivider className="my-12" />}
          <h2 className="font-serif italic text-3xl font-normal mb-4">{section.label}</h2>
          <ul className="divide-y divide-dotted divide-warm-gold/30">
            {section.items.map((item) => (
              <li key={item.id}>
                <OrderMenuItem item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
