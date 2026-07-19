import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { NewsListing } from '@/components/news/NewsListing';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'news' });
  return {
    title: t('page_title'),
    description: t('meta_description'),
  };
}

export default function NewsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('news');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('page_label')} title={t('page_title')} />
        </ScrollReveal>

        <NewsListing />
      </div>
    </div>
  );
}
