import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { WavyDivider } from '@/components/ui/WavyDivider';
import { PriceDisplay } from '@/components/menu/PriceDisplay';
import { formatPrice } from '@/lib/utils';
import type { MenuCardItem } from '@/components/menu/MenuCard';
import type { MenuBadge } from '@/types/menu';
import type { OptionGroup } from '@/types/order';

interface DrinkPriceListProps {
  sections: { title: string; items: MenuCardItem[] }[];
}

const badgeKeys: Record<MenuBadge, string> = {
  signature: 'badge_signature',
  seasonal: 'badge_seasonal',
  new: 'badge_new',
  limited: 'badge_limited',
};

type Labeled = { labelZh: string; labelEn: string; labelJa: string };

/** Unique option groups across all items, in first-seen order. */
function collectOptionGroups(items: MenuCardItem[]): OptionGroup[] {
  const groups = new Map<string, OptionGroup>();
  for (const item of items) {
    for (const group of item.optionGroups ?? []) {
      if (!groups.has(group.key)) groups.set(group.key, group);
    }
  }
  return Array.from(groups.values());
}

export function DrinkPriceList({ sections }: DrinkPriceListProps) {
  const locale = useLocale();
  const t = useTranslations('menu');

  const label = (obj: Labeled) => (locale === 'ja' ? obj.labelJa : locale === 'en' ? obj.labelEn : obj.labelZh);
  const optionGroups = collectOptionGroups(sections.flatMap((s) => s.items));
  // Option surcharges are only priced in TWD; don't show them against yen menu prices.
  const showDeltas = locale !== 'ja';

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14">
        {sections.map((section) => (
          <ScrollReveal key={section.title}>
            <section>
              <h2 className="font-serif italic text-3xl font-normal mb-6">{section.title}</h2>
              <ul className="space-y-5">
                {section.items.map((item) => {
                  const name = locale === 'ja' ? item.nameJa : locale === 'en' ? item.nameEn : item.nameZh;
                  const featuredBadges = item.badges.filter((b) => b !== 'seasonal');
                  return (
                    <li key={item.id}>
                      <div className="flex items-baseline gap-3">
                        <span className="text-[13px] tracking-[1px] uppercase text-charcoal">{name}</span>
                        <span aria-hidden="true" className="flex-1 min-w-4 border-b border-dotted border-warm-gold/40" />
                        <PriceDisplay twd={item.priceTwd} jpy={item.priceJpy} />
                      </div>
                      {(locale !== 'zh-TW' || featuredBadges.length > 0) && (
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {locale !== 'zh-TW' && (
                            <span className="font-serif-tc text-sm text-charcoal-muted">{item.nameZh}</span>
                          )}
                          {featuredBadges.map((badge) => (
                            <Badge key={badge} variant={badge} className="px-2 py-0.5 text-[10px]">
                              {t(badgeKeys[badge])}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </ScrollReveal>
        ))}
      </div>

      {optionGroups.length > 0 && (
        <>
          <WavyDivider className="my-14" />
          <ScrollReveal>
            <section>
              <h2 className="font-serif italic text-3xl font-normal mb-8">{t('customize_title')}</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {optionGroups.map((group) => (
                  <div key={group.key}>
                    <dt className="text-[13px] tracking-[1px] uppercase text-charcoal mb-1">{label(group)}</dt>
                    <dd className="text-sm leading-relaxed text-charcoal-muted">
                      {group.choices
                        .map((choice) =>
                          showDeltas && choice.priceDeltaTwd
                            ? `${label(choice)} +${formatPrice(choice.priceDeltaTwd)}`
                            : label(choice)
                        )
                        .join(' · ')}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </ScrollReveal>
        </>
      )}
    </div>
  );
}
