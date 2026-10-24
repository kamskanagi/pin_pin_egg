import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/utils';
import { STAGGER } from '@/lib/motion';
import { menuHighlights, type MenuHighlight } from '@/lib/placeholder-data';

/**
 * Eggcakes as one large feature, tea and coffee stacked beside it. An uneven
 * pair reads as an edited menu; three identical rows read as a template.
 */
export function MenuHighlights() {
  const t = useTranslations('home');
  const tMenu = useTranslations('menu');
  const locale = useLocale();

  const pick = (card: MenuHighlight, field: 'title' | 'description') => {
    if (locale === 'ja') return card[`${field}Ja`];
    if (locale === 'en') return card[`${field}En`];
    return card[`${field}Zh`];
  };

  const [feature, ...rest] = menuHighlights;

  const renderCard = (card: MenuHighlight, i: number, large: boolean) => (
    <ScrollReveal key={card.titleEn} delay={i * STAGGER.base} className="group">
      <Link href={card.href} className="block" aria-label={t('explore_category', { category: pick(card, 'title') })}>
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl bg-cream-dark',
            large ? 'aspect-[4/5]' : 'aspect-[16/10]'
          )}
        >
          <Image
            src={card.image}
            alt={pick(card, 'title')}
            fill
            sizes={large ? '(max-width: 768px) 100vw, 620px' : '(max-width: 768px) 100vw, 440px'}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="mt-6 flex items-baseline justify-between gap-6">
        <h3 className={cn('font-serif font-light text-charcoal', large ? 'text-4xl md:text-5xl' : 'text-3xl')}>
          {pick(card, 'title')}
        </h3>
        <p className="shrink-0 text-sm font-medium tracking-wide text-warm-gold-dark">
          {tMenu('from_price', { price: card.priceTwd })}
        </p>
      </div>
      <p className={cn('mt-3 leading-relaxed text-charcoal-light', large ? 'max-w-[46ch]' : 'max-w-[40ch] text-[15px]')}>
        {pick(card, 'description')}
      </p>
      <div className="mt-5">
        <TextLink href={card.href}>{t('explore_category', { category: pick(card, 'title') })}</TextLink>
      </div>
    </ScrollReveal>
  );

  return (
    <section className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <div className="mb-14 md:mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <MaskedHeading
            text={t('menu_section_title')}
            className="font-serif italic text-4xl md:text-6xl font-light text-charcoal"
          />
          <ScrollReveal>
            <TextLink href="/menu">{t('view_full_menu')}</TextLink>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">{renderCard(feature, 0, true)}</div>
          <div className="flex flex-col gap-16 md:col-span-5 md:pt-24">
            {rest.map((card, i) => renderCard(card, i + 1, false))}
          </div>
        </div>
      </div>
    </section>
  );
}
