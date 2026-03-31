'use client';

import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={cn(
            'px-5 py-2 text-[13px] tracking-[1.5px] uppercase font-sans rounded-sm transition-all duration-300',
            active === cat.key
              ? 'bg-charcoal text-white'
              : 'text-charcoal-muted hover:text-charcoal border border-charcoal/10 hover:border-charcoal/30'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
