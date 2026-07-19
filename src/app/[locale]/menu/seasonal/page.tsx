import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MenuGrid } from '@/components/menu/MenuGrid';
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

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('filter_seasonal')} title={t('seasonal')} />
        </ScrollReveal>

        <MenuGrid items={seasonalItems} />
      </div>
    </div>
  );
}
