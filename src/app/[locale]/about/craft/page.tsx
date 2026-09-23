import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { EditorialSplit } from '@/components/ui/EditorialSplit';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { PageIntro } from '@/components/ui/PageIntro';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLink } from '@/components/ui/TextLink';
import { WavyDivider } from '@/components/ui/WavyDivider';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'craft' });
  return { title: t('label'), description: t('intro') };
}

const steps = [
  { key: 'batter', number: '01', image: '/images/about/craft-01.jpg' },
  { key: 'pour', number: '02', image: '/images/about/craft-02.jpg' },
  { key: 'flip', number: '03', image: '/images/about/craft-03.jpg' },
  { key: 'finish', number: '04', image: '/images/about/craft-04.jpg' },
] as const;

const promises = ['low_sugar', 'made_to_order', 'ingredients'] as const;

export default function CraftPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('craft');

  return (
    <div className="pt-32 pb-24">
      <section className="px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <PageIntro label={t('label')} title={t('title')} intro={t('intro')} />

          <div className="divide-y divide-warm-gold/15">
            {steps.map((step) => (
              <EditorialSplit
                key={step.key}
                headingLevel="h2"
                label={t('step', { number: step.number })}
                title={t(`steps.${step.key}.title`)}
                intro={t(`steps.${step.key}.body`)}
                image={step.image}
                imageAlt={t(`steps.${step.key}.title`)}
                caption={
                  <span
                    aria-hidden="true"
                    className="block font-serif italic text-8xl font-light leading-none text-warm-gold-light"
                  >
                    {step.number}
                  </span>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quality promise */}
      <section className="px-6 md:px-12 py-24 bg-cream-dark/50">
        <div className="max-w-content mx-auto">
          <MaskedHeading
            text={t('promise_title')}
            className="font-serif italic text-4xl md:text-5xl font-light mb-10"
          />
          <WavyDivider className="mb-12" />
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {promises.map((key, i) => (
              <ScrollReveal key={key} delay={i * 0.15}>
                <dt className="font-serif italic text-2xl mb-3">{t(`promises.${key}.title`)}</dt>
                <dd className="text-charcoal-muted text-sm leading-relaxed">{t(`promises.${key}.body`)}</dd>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-6 md:px-12 pt-20 text-center">
        <ScrollReveal>
          <TextLink href="/menu/eggcakes">{t('cta')}</TextLink>
        </ScrollReveal>
      </section>
    </div>
  );
}
