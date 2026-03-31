import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { PhilosophyStrip } from '@/components/home/PhilosophyStrip';
import { MenuHighlights } from '@/components/home/MenuHighlights';
import { LocationsPreview } from '@/components/home/LocationsPreview';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { CtaBanner } from '@/components/home/CtaBanner';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: '品品Café — ' + t('hero_tagline'),
    description: t('hero_philosophy'),
  };
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PhilosophyStrip />
      <MenuHighlights />
      <LocationsPreview />
      <InstagramFeed />
      <CtaBanner />
    </>
  );
}
