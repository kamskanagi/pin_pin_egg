'use client';

import { motion } from 'framer-motion';
import { DURATION, EASE, VIEWPORT_PRECISE } from '@/lib/motion';

interface DottedLeaderProps {
  /** Stagger delay in seconds, matching the row it belongs to. */
  delay?: number;
}

/**
 * The dotted rule between a store name and its country tag, drawn left to right.
 *
 * A `border-dotted` can't be drawn progressively, so the dots are a repeating
 * gradient on a scaled span instead. Scaling from the left edge keeps the whole
 * thing on the compositor.
 */
export function DottedLeader({ delay = 0 }: DottedLeaderProps) {
  return (
    <span aria-hidden="true" className="flex-1 min-w-4 self-center overflow-hidden opacity-30">
      <motion.span
        data-motion-reveal=""
        className="block h-px origin-left bg-[repeating-linear-gradient(to_right,theme(colors.warm-gold.light)_0_2px,transparent_2px_5px)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_PRECISE}
        transition={{ duration: DURATION.entrance, delay, ease: EASE }}
      />
    </span>
  );
}
