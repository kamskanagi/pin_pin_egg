import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { DrinkPriceList } from '@/components/menu/DrinkPriceList';
import { teaItems, coffeeItems } from '@/lib/placeholder-data';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'menu' });
  return {
    title: t('drinks'),
    description: t('drinks_meta'),
  };
}

export default function DrinksPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('menu');

  return (
    <div className="bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs tracking-[4px] uppercase text-warm-gold mb-4">{t('drinks')}</p>
            <MaskedHeading
              as="h1"
              text={t('explore_drinks')}
              className="font-serif italic text-4xl md:text-5xl font-light leading-[1.05] mb-5"
            />
            <ScrollReveal>
              <p className="text-charcoal-muted leading-relaxed mb-8 max-w-sm">{t('drinks_tagline')}</p>
            </ScrollReveal>
            <ParallaxImage
              src="/images/menu/matcha.jpg"
              alt={t('tea_collection')}
              aspect="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 340px"
              priority
              className="rounded-sm hidden sm:block"
            />
          </div>
        </aside>

        <div className="lg:col-span-8 lg:pt-2">
          <DrinkPriceList
            sections={[
              { title: t('tea_short'), items: teaItems },
              { title: t('coffee_short'), items: coffeeItems },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
