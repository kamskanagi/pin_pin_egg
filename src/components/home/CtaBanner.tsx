import { useTranslations } from 'next-intl';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';

// A flat, still band. The old drifting gold gradient read as stock, and white
// text on it failed contrast; charcoal on the light gold passes comfortably.
export function CtaBanner() {
  const t = useTranslations('home');

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-warm-gold-light">
      <div className="max-w-content mx-auto text-center">
        <MaskedHeading
          text={t('cta_title')}
          className="font-serif italic text-4xl md:text-6xl font-light text-charcoal text-balance mb-5"
        />
        <ScrollReveal>
          <p className="text-charcoal-light mb-10 max-w-lg mx-auto">{t('cta_subtitle')}</p>
          <MagneticButton className="inline-block">
            <Button href="/locations" variant="solid">
              {t('view_locations')}
            </Button>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
