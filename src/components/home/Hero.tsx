'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { DURATION, EASE, STAGGER } from '@/lib/motion';

/** The wordmark, split so each glyph rises on its own beat. */
const WORDMARK = ['品', '品'];

export function Hero() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const prefersReducedMotion = useReducedMotion();

  const animate = !prefersReducedMotion;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background. Only a transform touches the image — a clip-path here would
          collapse its area to zero at first paint, and Chrome will not score a
          zero-area element as an LCP candidate, so the whole wipe duration would
          be added to LCP. */}
      <div className="absolute inset-0 bg-charcoal">
        <motion.div
          className="absolute inset-0"
          initial={animate ? { scale: 1.08 } : undefined}
          animate={animate ? { scale: 1 } : undefined}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <Image
            src="/images/hero/hero-cafe.jpg"
            alt={t('hero_image_alt')}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />
      </div>

      {/* The wipe is a solid panel lifting off the photo rather than a clip on
          the photo itself. LCP ignores occlusion by a later-painted sibling, so
          the image is scored on its own first paint and the reveal is free. */}
      <motion.div
        aria-hidden="true"
        data-motion-reveal=""
        className="absolute inset-0 z-[5] origin-top bg-charcoal"
        initial={animate ? { scaleY: 1 } : undefined}
        animate={animate ? { scaleY: 0 } : undefined}
        transition={{ duration: 1.3, ease: EASE }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1
          className="font-serif-tc text-[clamp(80px,12vw,140px)] font-light tracking-[6px] leading-none flex justify-center"
          aria-label={WORDMARK.join('')}
        >
          {WORDMARK.map((glyph, i) => (
            // pb/-mb keeps the mask clear of the glyph's descender box without
            // adding to the line height.
            <span key={i} aria-hidden="true" className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <motion.span
                className="block"
                initial={animate ? { y: '110%' } : undefined}
                animate={animate ? { y: '0%' } : undefined}
                transition={{
                  duration: DURATION.hero,
                  delay: 0.6 + i * STAGGER.loose,
                  ease: EASE,
                }}
              >
                {glyph}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 font-serif text-lg md:text-xl tracking-[4px] text-white/80"
          initial={animate ? { opacity: 0, y: 15 } : undefined}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: DURATION.entrance, delay: 1.0, ease: EASE }}
        >
          {t('hero_tagline')}
        </motion.p>

        <motion.div
          className="w-12 h-px bg-warm-gold mx-auto mt-6"
          initial={animate ? { scaleX: 0 } : undefined}
          animate={animate ? { scaleX: 1 } : undefined}
          transition={{ duration: DURATION.entrance, delay: 1.25, ease: EASE }}
        />

        <motion.p
          className="mt-6 font-serif-tc text-sm tracking-[2px] text-white/60"
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ duration: DURATION.entrance, delay: 1.45 }}
        >
          {t('hero_philosophy')}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: DURATION.entrance, delay: 1.8 }}
      >
        <span className="text-[10px] tracking-[3px] uppercase text-white/40 font-sans" aria-hidden="true">
          {tCommon('scroll')}
        </span>
        <motion.div
          className="w-px h-8 bg-white/30"
          animate={animate ? { scaleY: [0, 1, 0], originY: 0 } : undefined}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
