import { useFormatter, useTranslations } from 'next-intl';
import { PageIntro } from '@/components/ui/PageIntro';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { WavyDivider } from '@/components/ui/WavyDivider';

interface LegalSection {
  title: string;
  body: string;
}

interface LegalPageProps {
  /** Key under the `legal` namespace. */
  document: 'privacy' | 'terms';
  /** ISO date this document was last revised. */
  updatedAt: string;
}

/** Shared layout for the privacy policy and terms of use. */
export function LegalPage({ document, updatedAt }: LegalPageProps) {
  const t = useTranslations(`legal.${document}`);
  const tLegal = useTranslations('legal');
  const format = useFormatter();
  const sections = t.raw('sections') as LegalSection[];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <PageIntro label={tLegal('label')} title={t('title')} intro={t('intro')} />

        <p className="text-[12px] tracking-[1.5px] uppercase text-charcoal-muted mb-14">
          {tLegal('last_updated', {
            date: format.dateTime(new Date(updatedAt), { year: 'numeric', month: 'long', day: 'numeric' }),
          })}
        </p>

        <div className="flex flex-col">
          {sections.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.05}>
              <section>
                {i > 0 && <WavyDivider className="my-10" />}
                <h2 className="font-serif italic text-3xl font-light mb-4">{section.title}</h2>
                {section.body.split('\n\n').map((paragraph, j) => (
                  <p key={j} className="text-charcoal-muted leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </section>
            </ScrollReveal>
          ))}
        </div>

        <WavyDivider className="my-12" />
        <p className="text-sm text-charcoal-muted">
          {tLegal('contact_line')}{' '}
          <a
            href="mailto:hello@pinpincafe.com"
            className="underline decoration-dotted decoration-warm-gold/50 underline-offset-4 transition-colors hover:text-warm-gold-dark"
          >
            hello@pinpincafe.com
          </a>
        </p>
      </div>
    </div>
  );
}
