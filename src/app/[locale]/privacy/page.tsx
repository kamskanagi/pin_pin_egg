import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';

/** Bump when the text below changes materially. */
const UPDATED_AT = '2026-09-23';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  return {
    title: t('title'),
    description: t('intro'),
  };
}

export default function PrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return <LegalPage document="privacy" updatedAt={UPDATED_AT} />;
}
