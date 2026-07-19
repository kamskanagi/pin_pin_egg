import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MenuGrid } from '@/components/menu/MenuGrid';
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
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('drinks')} title={t('drinks')} />
        </ScrollReveal>

        {/* Tea section */}
        <div className="mb-16">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="w-8 h-px bg-warm-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-charcoal-muted">
                {t('tea_collection')}
              </h3>
            </div>
          </ScrollReveal>
          <MenuGrid items={teaItems} />
        </div>

        {/* Coffee section */}
        <div>
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="w-8 h-px bg-warm-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-charcoal-muted">
                {t('coffee_selection')}
              </h3>
            </div>
          </ScrollReveal>
          <MenuGrid items={coffeeItems} />
        </div>
      </div>
    </div>
  );
}
