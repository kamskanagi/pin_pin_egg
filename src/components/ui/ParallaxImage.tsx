'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DURATION, EASE, VIEWPORT_PRECISE } from '@/lib/motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class that sizes the container, e.g. `aspect-[3/4]`. */
  aspect: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Wipe the image in from the bottom when it enters the viewport. */
  reveal?: boolean;
  /** Stagger delay for the reveal, in seconds. Ignored unless `reveal`. */
  revealDelay?: number;
}

export function ParallaxImage({
  src,
  alt,
  aspect,
  sizes,
  priority,
  className,
  reveal = false,
  revealDelay = 0,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  const wipe = reveal && !prefersReducedMotion;

  return (
    // Three layers, and the split matters:
    //   outer  — sizes the box and owns the in-view trigger. It must NOT be
    //            clipped: a clip-path collapses the element's intersection rect
    //            to zero, so an observer on it would never fire and the wipe
    //            could never open itself. Same trap as MaskedHeading.
    //   middle — the clip-path wipe.
    //   inner  — the parallax scale, so the two never contend for one element.
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden bg-cream-dark', aspect, className)}
      initial={wipe ? 'hidden' : undefined}
      whileInView={wipe ? 'visible' : undefined}
      viewport={wipe ? VIEWPORT_PRECISE : undefined}
    >
      <motion.div
        data-motion-reveal=""
        className="absolute inset-0"
        variants={
          wipe
            ? {
                hidden: { clipPath: 'inset(0 0 100% 0)' },
                visible: {
                  clipPath: 'inset(0 0 0% 0)',
                  transition: { duration: DURATION.entrance, delay: revealDelay, ease: EASE },
                },
              }
            : undefined
        }
      >
        <motion.div
          className="absolute inset-0"
          style={prefersReducedMotion ? undefined : { scale }}
        >
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
