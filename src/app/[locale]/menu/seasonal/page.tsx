import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { MenuPageLayout } from '@/components/menu/MenuPageLayout';
import { MenuPriceList } from '@/components/menu/MenuPriceList';
import { seasonalItems } from '@/lib/placeholder-data';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'menu' });
  return {
    title: t('seasonal'),
    description: t('seasonal_meta'),
  };
}

export default function SeasonalPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('menu');

  // Seasonal items mix eggcakes and drinks; ids are prefixed by product line.
  const seasonalEggcakes = seasonalItems.filter((item) => item.id.startsWith('eggcake-'));
  const seasonalDrinks = seasonalItems.filter((item) => !seasonalEggcakes.includes(item));

  return (
    <MenuPageLayout
      label={t('seasonal')}
      title={t('explore_seasonal')}
      tagline={t('seasonal_tagline')}
      image="/images/menu/seasonal.jpg"
      imageAlt={t('seasonal')}
    >
      <MenuPriceList
        showDescriptions
        hiddenBadges={['seasonal']}
        sections={[
          { title: t('eggcakes'), items: seasonalEggcakes },
          { title: t('drinks'), items: seasonalDrinks },
        ]}
      />
    </MenuPageLayout>
  );
}
