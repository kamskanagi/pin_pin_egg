'use client';

import { useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { PriceDisplay } from './PriceDisplay';
import type { MenuBadge } from '@/types/menu';

interface MenuCardItem {
  nameZh: string;
  nameEn: string;
  nameJa: string;
  descriptionZh: string;
  descriptionEn: string;
  descriptionJa: string;
  priceTwd: number;
  priceJpy?: number;
  badges: MenuBadge[];
}

interface MenuCardProps {
  item: MenuCardItem;
}

const badgeLabels: Record<MenuBadge, string> = {
  signature: 'Signature',
  seasonal: 'Seasonal',
  new: 'New',
  limited: 'Limited',
};

export function MenuCard({ item }: MenuCardProps) {
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const name = locale === 'ja' ? item.nameJa : locale === 'en' ? item.nameEn : item.nameZh;
  const subName = locale === 'zh-TW' ? item.nameEn : item.nameZh;
  const description =
    locale === 'ja' ? item.descriptionJa : locale === 'en' ? item.descriptionEn : item.descriptionZh;

  return (
    <motion.div
      className="rounded-2xl bg-white p-7 transition-shadow duration-500 ease-out-expo"
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -8, boxShadow: '0 20px 40px rgba(42, 37, 32, 0.08)' }
      }
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Placeholder image */}
      <div className="aspect-[4/3] rounded-xl bg-cream-dark mb-5 overflow-hidden flex items-center justify-center group">
        <span className="font-serif-tc text-4xl text-charcoal-muted/15 group-hover:scale-105 transition-transform duration-600">
          品
        </span>
      </div>

      {/* Badges */}
      {item.badges.length > 0 && (
        <div className="flex gap-2 mb-3">
          {item.badges.map((badge) => (
            <Badge key={badge} variant={badge}>
              {badgeLabels[badge]}
            </Badge>
          ))}
        </div>
      )}

      {/* Names */}
      <h3 className="font-serif text-2xl font-normal">{name}</h3>
      <p className="font-serif-tc text-sm text-charcoal-muted mt-1">{subName}</p>

      {/* Description */}
      <p className="text-charcoal-muted text-sm leading-relaxed mt-3 mb-4">
        {description}
      </p>

      {/* Price */}
      <PriceDisplay twd={item.priceTwd} jpy={item.priceJpy} />
    </motion.div>
  );
}

export type { MenuCardItem };
