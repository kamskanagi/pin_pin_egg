import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { MenuPageLayout } from '@/components/menu/MenuPageLayout';
import { MenuPriceList } from '@/components/menu/MenuPriceList';
import { teaItems, caffeineFreeItems, milkItems } from '@/lib/placeholder-data';

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
    <MenuPageLayout
      label={t('drinks')}
      title={t('explore_drinks')}
      tagline={t('drinks_tagline')}
      image="/images/menu/matcha.jpg"
      imageAlt={t('tea_collection')}
    >
      <MenuPriceList
        sections={[
          { title: t('tea_collection'), items: teaItems },
          { title: t('milk_series'), items: milkItems },
          { title: t('caffeine_free'), items: caffeineFreeItems },
        ]}
      />

        <p className="mt-12 border-t border-dotted border-warm-gold/40 pt-6 text-sm text-charcoal-muted">
          {t('combo_note')}
        </p>
    </MenuPageLayout>
  );
}
