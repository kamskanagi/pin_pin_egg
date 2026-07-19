'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const prefersReducedMotion = useReducedMotion();

  const animate = !prefersReducedMotion;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-charcoal">
        <Image
          src="/images/hero/hero-cafe.jpg"
          alt={t('hero_image_alt')}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.h1
          className="font-serif-tc text-[clamp(80px,12vw,140px)] font-light tracking-[6px] leading-none"
          initial={animate ? { opacity: 0, y: 20 } : undefined}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          品品
        </motion.h1>

        <motion.p
          className="mt-6 font-serif text-lg md:text-xl tracking-[4px] text-white/80"
          initial={animate ? { opacity: 0, y: 15 } : undefined}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {t('hero_tagline')}
        </motion.p>

        <motion.div
          className="w-12 h-px bg-warm-gold mx-auto mt-6"
          initial={animate ? { scaleX: 0 } : undefined}
          animate={animate ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />

        <motion.p
          className="mt-6 font-serif-tc text-sm tracking-[2px] text-white/60"
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {t('hero_philosophy')}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 1.4 }}
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
