'use client';

import { useTranslations } from 'next-intl';
import { eggcakeItems, teaItems, coffeeItems, seasonalItems } from '@/lib/placeholder-data';
import { OrderMenuItem } from './OrderMenuItem';

export function OrderMenuList() {
  const t = useTranslations('menu');

  const sections = [
    { key: 'eggcakes', label: t('eggcakes'), items: eggcakeItems },
    { key: 'drinks-tea', label: t('tea_collection'), items: teaItems },
    { key: 'drinks-coffee', label: t('coffee_selection'), items: coffeeItems },
    { key: 'seasonal', label: t('seasonal'), items: seasonalItems },
  ];

  return (
    <div className="flex flex-col gap-12">
      {sections.map((section) => (
        <div key={section.key}>
          <h3 className="font-serif text-xl text-charcoal-muted mb-4">{section.label}</h3>
          <div className="flex flex-col gap-3">
            {section.items.map((item) => (
              <OrderMenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
