import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { LocationsContent } from '@/components/locations/LocationsContent';
import { storeLocations } from '@/lib/placeholder-data';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'locations' });
  return {
    title: t('page_title'),
    description: t('meta_description'),
  };
}

function buildJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': storeLocations.map((s) => ({
      '@type': 'CafeOrCoffeeShop',
      name: locale === 'ja' ? s.nameJa : locale === 'en' ? s.nameEn : s.nameZh,
      address:
        locale === 'ja' ? s.addressJa : locale === 'en' ? s.addressEn : s.addressZh,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: s.lat,
        longitude: s.lng,
      },
      hasMap: s.googleMapsUrl,
      openingHours: s.hoursEn,
      parentOrganization: {
        '@type': 'Organization',
        name: '品品Café',
      },
    })),
  };
}

export default function LocationsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('locations');
  const jsonLd = buildJsonLd(locale);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('page_label')} title={t('page_title')} />
        </ScrollReveal>

        <LocationsContent />
      </div>
    </div>
  );
}
