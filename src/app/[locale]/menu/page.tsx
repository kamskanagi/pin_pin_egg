import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLinkLabel } from '@/components/ui/TextLink';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'menu' });
  return {
    title: t('overview_title'),
    description: t('meta_description'),
  };
}

const categories = [
  {
    href: '/menu/eggcakes',
    titleKey: 'eggcakes',
    taglineKey: 'eggcakes_tagline',
    ctaKey: 'view_eggcakes',
    titleZh: '雞蛋仔',
    image: '/images/menu/eggcake.jpg',
  },
  {
    href: '/menu/drinks',
    titleKey: 'drinks',
    taglineKey: 'drinks_tagline',
    ctaKey: 'view_drinks',
    titleZh: '茶 × 咖啡',
    image: '/images/menu/matcha.jpg',
  },
  {
    href: '/menu/seasonal',
    titleKey: 'seasonal',
    taglineKey: 'seasonal_tagline',
    ctaKey: 'view_seasonal',
    titleZh: '季節限定',
    image: '/images/menu/seasonal.jpg',
  },
] as const;

export default function MenuOverviewPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('menu');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('overview_label')} title={t('overview_title')} />
        </ScrollReveal>

        <div className="border-t border-warm-gold/15 divide-y divide-warm-gold/15">
          {categories.map((cat, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <ScrollReveal key={cat.titleKey} delay={i * 0.1}>
                <Link
                  href={cat.href}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-16 md:py-20"
                >
                  <div
                    className={cn(
                      'relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl bg-charcoal md:col-span-7',
                      imageFirst ? 'md:order-1' : 'md:order-2'
                    )}
                  >
                    <Image
                      src={cat.image}
                      alt={t(cat.titleKey)}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 700px"
                      priority={i === 0}
                    />
                  </div>

                  <div
                    className={cn(
                      'md:col-span-5',
                      imageFirst ? 'md:order-2' : 'md:order-1'
                    )}
                  >
                    {locale !== 'zh-TW' && (
                      <p className="font-serif-tc text-sm tracking-[3px] text-warm-gold mb-3">
                        {cat.titleZh}
                      </p>
                    )}
                    <h3 className="font-serif text-4xl md:text-5xl font-normal mb-5">
                      {t(cat.titleKey)}
                    </h3>
                    <p className="text-charcoal-muted leading-relaxed mb-7 max-w-sm">
                      {t(cat.taglineKey)}
                    </p>
                    <TextLinkLabel>{t(cat.ctaKey)}</TextLinkLabel>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <p className="mt-12 border-t border-dotted border-warm-gold/40 pt-6 text-sm text-charcoal-muted">
          {t('combo_note')}
        </p>
      </div>
    </div>
  );
}
