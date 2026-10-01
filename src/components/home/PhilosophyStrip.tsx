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
 * Reduced motion is handled in CSS via the `data-motion-*` hooks, not by
 * branching the markup: `useReducedMotion()` returns `null` on the server, so a
 * structural branch would render one tree during SSR and a different one on
 * hydration. The CSS unpins the column and collapses the scrub distance, and
 * the glyph's rest appearance lives in its colour alpha rather than in the
 * animated `opacity`, so forcing `opacity: 1` restores it exactly.
 */
export function PhilosophyStrip() {
  const t = useTranslations('home');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // `start start` → the column has just pinned. `end end` → it is about to
  // unpin. Progress therefore maps 1:1 onto the sticky window.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const glyphScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1.08, 0.96]);
  const glyphOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.35]);
  const glyphY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    // The scrub distance lives on the section and the sticky track is a fixed
    // h-screen, so nothing inside can shift layout. Both are needed to keep CLS
    // at zero.
    <section
      ref={sectionRef}
      data-motion-spacer
      className="relative bg-cream-dark/50 min-h-[150vh] md:min-h-[180vh]"
    >
      <div
        data-motion-sticky
        className="sticky top-0 h-screen flex items-center py-16 md:py-24 px-6 md:px-12"
      >
        <div className="max-w-content mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex items-center justify-center md:justify-end">
            <motion.span
              data-motion-scrub
              aria-hidden="true"
              style={
                prefersReducedMotion
                  ? undefined
                  : { scale: glyphScale, opacity: glyphOpacity, y: glyphY }
              }
              className="font-serif-tc text-[clamp(120px,20vw,240px)] font-light text-warm-gold-light/40 leading-none select-none will-change-transform"
            >
              品
            </motion.span>
          </div>

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
        </div>
      </div>
    </section>
  );
}
