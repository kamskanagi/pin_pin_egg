'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const highlightImages = [
  '/images/menu/eggcake.jpg',
  '/images/menu/matcha.jpg',
  '/images/menu/coffee.jpg',
];

interface HighlightCard {
  titleEn: string;
  titleZh: string;
  titleJa: string;
  descriptionEn: string;
  descriptionZh: string;
  descriptionJa: string;
  badge: 'signature' | 'seasonal' | 'new';
  badgeLabelEn: string;
  price: string;
  bgColor: string;
}

const highlights: HighlightCard[] = [
  {
    titleEn: 'Eggcakes',
    titleZh: '雞蛋仔系列',
    titleJa: 'エッグケーキ',
    descriptionEn: 'Crispy outside, QQ soft inside. Our signature Hong Kong-style egg waffles in classic and seasonal flavors.',
    descriptionZh: '外酥內軟QQ，招牌港式雞蛋仔，經典與季節限定口味。',
    descriptionJa: '外はカリッと、中はもちもち。定番から季節限定まで。',
    badge: 'signature',
    badgeLabelEn: 'Signature',
    price: '60',
    bgColor: 'bg-warm-gold/5',
  },
  {
    titleEn: 'Tea Collection',
    titleZh: '茶飲系列',
    titleJa: 'お茶コレクション',
    descriptionEn: 'Premium loose-leaf teas from Taiwan\'s finest gardens. From oolong to matcha, every cup tells a story.',
    descriptionZh: '嚴選台灣頂級茶園散葉茶，從烏龍到抹茶，每一杯都有故事。',
    descriptionJa: '台湾最高峰の茶園から厳選した茶葉。烏龍から抹茶まで。',
    badge: 'signature',
    badgeLabelEn: 'Signature',
    price: '80',
    bgColor: 'bg-accent-matcha/5',
  },
  {
    titleEn: 'Coffee',
    titleZh: '咖啡系列',
    titleJa: 'コーヒー',
    descriptionEn: 'Single-origin and house blends, crafted to pair perfectly with our eggcakes.',
    descriptionZh: '單品與自家拼配咖啡，完美搭配我們的雞蛋仔。',
    descriptionJa: 'シングルオリジンとハウスブレンド、エッグケーキとの相性抜群。',
    badge: 'signature',
    badgeLabelEn: 'Signature',
    price: '90',
    bgColor: 'bg-accent-coffee/5',
  },
];

export function MenuHighlights() {
  const t = useTranslations('home');
  const tMenu = useTranslations('menu');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const getTitle = (card: HighlightCard) => {
    if (locale === 'ja') return card.titleJa;
    if (locale === 'en') return card.titleEn;
    return card.titleZh;
  };

  const getDescription = (card: HighlightCard) => {
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
          {highlights.map((card, i) => (
            <ScrollReveal key={card.titleEn} delay={i * 0.15}>
              <motion.div
                className={cn(
                  'rounded-2xl p-7 transition-shadow duration-500 ease-out-expo',
                  card.bgColor
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
                    src={highlightImages[i]}
                    alt={getTitle(card)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <Badge variant={card.badge} className="mb-3">
                  {card.badgeLabelEn}
                </Badge>

                <h3 className="font-serif text-2xl font-normal mb-1">
                  {locale === 'zh-TW' ? card.titleZh : card.titleEn}
                </h3>
                {locale !== 'zh-TW' && (
                  <p className="font-serif-tc text-sm text-charcoal-muted mb-3">
                    {card.titleZh}
                  </p>
                )}
                {locale === 'zh-TW' && (
                  <p className="font-serif text-sm text-charcoal-muted mb-3">
                    {card.titleEn}
                  </p>
                )}

                <p className="text-charcoal-muted text-sm leading-relaxed mb-4">
                  {getDescription(card)}
                </p>

                <p className="text-sm tracking-wide font-medium text-warm-gold-dark">
                  {tMenu('from_price', { price: card.price })}
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
