'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function CtaBanner() {
  const t = useTranslations('home');
  const prefersReducedMotion = useReducedMotion();

  return (
    // The gradient is drawn at 200% and its position drifts, so the gold moves
    // across the band without anything in layout changing.
    <motion.section
      className="py-24 px-6 md:px-12 bg-gradient-to-br from-warm-gold via-warm-gold-light to-warm-gold-dark bg-[length:200%_200%]"
      initial={{ backgroundPosition: '0% 50%' }}
      animate={
        prefersReducedMotion ? undefined : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
      }
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
    >
      <div className="max-w-content mx-auto text-center">
        <MaskedHeading
          text={t('cta_title')}
          className="font-serif italic text-4xl md:text-5xl font-light text-white mb-4"
        />
        <ScrollReveal>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">{t('cta_subtitle')}</p>
          <MagneticButton className="inline-block">
            <Button href="/locations" variant="white">
              {t('view_locations')}
            </Button>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </motion.section>
  );
}
