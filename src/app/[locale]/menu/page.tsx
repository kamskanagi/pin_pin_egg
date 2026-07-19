import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

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
    feature: true,
  },
  {
    href: '/menu/drinks',
    titleKey: 'drinks',
    taglineKey: 'drinks_tagline',
    ctaKey: 'view_drinks',
    titleZh: '茶 × 咖啡',
    image: '/images/menu/matcha.jpg',
    feature: false,
  },
  {
    href: '/menu/seasonal',
    titleKey: 'seasonal',
    taglineKey: 'seasonal_tagline',
    ctaKey: 'view_seasonal',
    titleZh: '季節限定',
    image: '/images/menu/seasonal.jpg',
    feature: false,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal
              key={cat.titleKey}
              delay={i * 0.15}
              className={cat.feature ? 'md:col-span-2' : undefined}
            >
              <Link
                href={cat.href}
                className={`group relative block overflow-hidden rounded-2xl bg-charcoal ${
                  cat.feature ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={cat.image}
                  alt={t(cat.titleKey)}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={cat.feature ? '(max-width: 768px) 100vw, 1100px' : '(max-width: 768px) 100vw, 50vw'}
                  priority={cat.feature}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  {locale !== 'zh-TW' && (
                    <p className="font-serif-tc text-sm tracking-[3px] text-warm-gold-light mb-2">
                      {cat.titleZh}
                    </p>
                  )}
                  <h3
                    className={`font-serif text-white ${
                      cat.feature ? 'text-4xl md:text-5xl' : 'text-3xl'
                    }`}
                  >
                    {t(cat.titleKey)}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                    {t(cat.taglineKey)}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 text-[13px] tracking-[1.5px] uppercase text-white transition-colors duration-300 group-hover:text-warm-gold-light">
                    {t(cat.ctaKey)}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
