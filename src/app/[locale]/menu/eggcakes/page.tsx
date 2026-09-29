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

  const bySeries = (series: 'classic' | 'rich' | 'luxe') =>
    eggcakeItems.filter((item) => item.series === series);

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
          { title: t('series_classic'), items: bySeries('classic') },
          { title: t('series_rich'), items: bySeries('rich') },
          { title: t('series_luxe'), items: bySeries('luxe') },
        ]}
      />

        <p className="mt-12 border-t border-dotted border-warm-gold/40 pt-6 text-sm text-charcoal-muted">
          {t('box_note')}
        </p>
      <p className="mt-3 text-sm text-charcoal-muted">{t('combo_note')}</p>
    </MenuPageLayout>
  );
}
