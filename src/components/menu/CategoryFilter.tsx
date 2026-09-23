'use client';

import { cn } from '@/lib/utils';

interface CategoryFilterProps<K extends string> {
  categories: { key: K; label: string }[];
  active: K;
  onChange: (key: K) => void;
}

/** Editorial text tab: uppercase label, dotted gold underline when active. */
export function filterTabClassName(active: boolean) {
  return cn(
    'py-2 text-[13px] tracking-[1.5px] uppercase font-sans underline-offset-8 transition-colors duration-300',
    active
      ? 'text-charcoal underline decoration-warm-gold decoration-dotted'
      : 'text-charcoal-muted hover:text-charcoal'
  );
}

export function CategoryFilter<K extends string>({ categories, active, onChange }: CategoryFilterProps<K>) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2 mb-12">
      {categories.map((cat) => (
        <button
          key={cat.key}
          type="button"
          aria-pressed={active === cat.key}
          onClick={() => onChange(cat.key)}
          className={filterTabClassName(active === cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
