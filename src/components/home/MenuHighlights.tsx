'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { menuHighlights, type MenuHighlight } from '@/lib/placeholder-data';

const cardTints = ['bg-warm-gold/5', 'bg-accent-matcha/5', 'bg-accent-coffee/5'];

const badgeKeys = {
  signature: 'badge_signature',
  seasonal: 'badge_seasonal',
  new: 'badge_new',
} as const;

export function MenuHighlights() {
  const t = useTranslations('home');
  const tMenu = useTranslations('menu');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const getTitle = (card: MenuHighlight) => {
    if (locale === 'ja') return card.titleJa;
    if (locale === 'en') return card.titleEn;
    return card.titleZh;
  };

  const getDescription = (card: MenuHighlight) => {
    if (locale === 'ja') return card.descriptionJa;
    if (locale === 'en') return card.descriptionEn;
    return card.descriptionZh;
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-cream">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader
            label={t('menu_section_label')}
            title={t('menu_section_title')}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuHighlights.map((card, i) => (
            <ScrollReveal key={card.titleEn} delay={i * 0.15}>
              <motion.div
                className={cn(
                  'rounded-2xl p-7 transition-shadow duration-500 ease-out-expo',
                  cardTints[i % cardTints.length]
                )}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -8, boxShadow: '0 20px 40px rgba(42, 37, 32, 0.08)' }
                }
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="aspect-[4/3] rounded-xl bg-cream-dark mb-6 overflow-hidden relative">
                  <Image
                    src={card.image}
                    alt={getTitle(card)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <Badge variant={card.badge} className="mb-3">
                  {tMenu(badgeKeys[card.badge])}
                </Badge>

                <h3 className="font-serif text-2xl font-normal mb-1">
                  {locale === 'zh-TW' ? card.titleZh : getTitle(card)}
                </h3>
                <p
                  className={cn(
                    'text-sm text-charcoal-muted mb-3',
                    locale === 'zh-TW' ? 'font-serif' : 'font-serif-tc'
                  )}
                >
                  {locale === 'zh-TW' ? card.titleEn : card.titleZh}
                </p>

                <p className="text-charcoal-muted text-sm leading-relaxed mb-4">
                  {getDescription(card)}
                </p>

                <p className="text-sm tracking-wide font-medium text-warm-gold-dark">
                  {tMenu('from_price', {
                    price: locale === 'ja' ? card.priceJpy : card.priceTwd,
                  })}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Button href="/menu" variant="outline">
              {t('view_full_menu')}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
