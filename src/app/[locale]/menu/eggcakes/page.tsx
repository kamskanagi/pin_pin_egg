import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { MenuPageLayout } from '@/components/menu/MenuPageLayout';
import { MenuPriceList } from '@/components/menu/MenuPriceList';
import { eggcakeItems } from '@/lib/placeholder-data';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'menu' });
  return {
    title: t('eggcakes'),
    description: t('eggcakes_meta'),
  };
}

export default function EggcakesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('menu');

  // Signature and unbadged flavors are the year-round lineup; everything else is new, seasonal, or limited.
  const classic = eggcakeItems.filter((item) => item.badges.length === 0 || item.badges.includes('signature'));
  const special = eggcakeItems.filter((item) => !classic.includes(item));

  return (
    <MenuPageLayout
      label={t('eggcakes')}
      title={t('explore_eggcakes')}
      tagline={t('eggcakes_tagline')}
      image="/images/menu/eggcake.jpg"
      imageAlt={t('eggcakes')}
    >
      <MenuPriceList
        showDescriptions
        sections={[
          { title: t('filter_classic'), items: classic },
          { title: t('eggcakes_special'), items: special },
        ]}
      />
    </MenuPageLayout>
  );
}
