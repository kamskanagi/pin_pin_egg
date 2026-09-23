import { useTranslations, useLocale } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { EditorialSplit } from '@/components/ui/EditorialSplit';
import { Button } from '@/components/ui/Button';
import { menuHighlights, type MenuHighlight } from '@/lib/placeholder-data';

export function MenuHighlights() {
  const t = useTranslations('home');
  const tMenu = useTranslations('menu');
  const locale = useLocale();

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
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader
            label={t('menu_section_label')}
            title={t('menu_section_title')}
          />
        </ScrollReveal>

        <div className="divide-y divide-warm-gold/15 border-t border-warm-gold/15">
          {menuHighlights.map((card) => (
            <EditorialSplit
              key={card.titleEn}
              headingLevel="h3"
              label={locale !== 'zh-TW' ? card.titleZh : undefined}
              title={getTitle(card)}
              intro={getDescription(card)}
              image={card.image}
              imageAlt={getTitle(card)}
              caption={
                <p className="text-sm tracking-wide font-medium text-warm-gold-dark">
                  {tMenu('from_price', {
                    price: locale === 'ja' ? card.priceJpy : card.priceTwd,
                  })}
                </p>
              }
              link={{
                href: card.href,
                label: t('explore_category', { category: getTitle(card) }),
              }}
            />
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
