import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'menu' });
  return {
    title: t('overview_title') + ' | 品品Café',
    description: t('overview_title'),
  };
}

const categories = [
  {
    href: '/menu/eggcakes',
    key: 'eggcakes',
    emoji: '🧇',
    bgColor: 'bg-warm-gold/5',
  },
  {
    href: '/menu/drinks',
    key: 'drinks',
    emoji: '🍵',
    bgColor: 'bg-accent-matcha/5',
  },
  {
    href: '/menu/seasonal',
    key: 'seasonal',
    emoji: '🌸',
    bgColor: 'bg-accent-coral/5',
  },
] as const;

export default function MenuOverviewPage({
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
          <SectionHeader label={t('overview_label')} title={t('overview_title')} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.key} delay={i * 0.15}>
              <div className={`rounded-2xl p-10 text-center ${cat.bgColor} transition-all duration-300 hover:shadow-lg`}>
                <span className="text-5xl mb-6 block">{cat.emoji}</span>
                <h3 className="font-serif text-2xl mb-4">{t(cat.key)}</h3>
                <Button href={cat.href} variant="outline" size="sm">
                  {t('overview_label')}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
