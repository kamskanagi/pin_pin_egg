'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MenuCard, type MenuCardItem } from './MenuCard';

interface MenuGridProps {
  items: MenuCardItem[];
}

export function MenuGrid({ items }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-charcoal-muted">No items found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <ScrollReveal key={item.nameEn} delay={i * 0.1}>
          <MenuCard item={item} />
        </ScrollReveal>
      ))}
    </div>
  );
}
