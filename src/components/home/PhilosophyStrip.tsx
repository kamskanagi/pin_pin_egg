'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLink } from '@/components/ui/TextLink';

/**
 * The homepage's signature moment: the 品 glyph is scrubbed by scroll position
 * while the brand copy holds in a sticky viewport.
 *
 * Under reduced motion this collapses back to the plain two-column section —
 * a different layout, not a scrubbed animation frozen at zero, so there is no
 * dead scroll to fall through.
 */
export function PhilosophyStrip() {
  const t = useTranslations('home');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const glyphScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.15]);
  const glyphOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.2]);
  const glyphY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const copy = (
    <div>
      <p className="text-xs tracking-[4px] uppercase text-warm-gold mb-4">
        {t('philosophy_label')}
      </p>
      <MaskedHeading
        text={t('philosophy_title')}
        className="font-serif italic text-4xl md:text-5xl font-light mb-6"
      />
      <ScrollReveal delay={0.15}>
        <p className="text-charcoal-muted leading-relaxed mb-8">{t('philosophy_body')}</p>
        <TextLink href="/about">{t('philosophy_link')}</TextLink>
      </ScrollReveal>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <section className="py-24 px-6 md:px-12 bg-cream-dark/50">
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex items-center justify-center md:justify-end">
            <span className="font-serif-tc text-[clamp(120px,20vw,240px)] font-light text-warm-gold-light/40 leading-none select-none">
              品
            </span>
          </div>
          {copy}
        </div>
      </section>
    );
  }

  return (
    // The tall height lives on the section; the sticky track is a fixed h-screen
    // so nothing inside it can shift layout. Both are required to keep CLS at 0.
    <section ref={sectionRef} className="relative bg-cream-dark/50 min-h-[150vh] md:min-h-[180vh]">
      <div className="sticky top-0 h-screen flex items-center py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-content mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex items-center justify-center md:justify-end">
            <motion.span
              aria-hidden="true"
              style={{ scale: glyphScale, opacity: glyphOpacity, y: glyphY }}
              className="font-serif-tc text-[clamp(120px,20vw,240px)] font-light text-warm-gold-light leading-none select-none will-change-transform"
            >
              品
            </motion.span>
          </div>
          {copy}
        </div>
      </div>
    </section>
  );
}
