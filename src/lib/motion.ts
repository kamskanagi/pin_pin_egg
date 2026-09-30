import type { Variants } from 'framer-motion';

/**
 * Shared motion tokens. Pure data — no `'use client'`, so Server Components can
 * read durations and stagger values when passing props to client leaves.
 *
 * The curve mirrors `ease-out-expo` in `tailwind.config.ts`; keep the two in sync.
 */
export const EASE = [0.23, 1, 0.32, 1] as const;

/** Seconds, by purpose. Exits should run at ~75% of their entrance. */
export const DURATION = {
  feedback: 0.15,
  state: 0.3,
  layout: 0.5,
  entrance: 0.8,
  hero: 1,
} as const;

/** Delay between siblings in a staggered group. */
export const STAGGER = {
  tight: 0.08,
  base: 0.12,
  loose: 0.15,
} as const;

/**
 * Two scroll triggers, on purpose.
 *
 * `EARLY` starts the reveal 200px before the element enters, so a fast scroll
 * never lands on blank space. It is the historical default across the ~34
 * `ScrollReveal` call sites and stays the default.
 *
 * `PRECISE` is the spec §4.5 trigger: the reveal begins just *after* the
 * element enters, so it is actually witnessed. Use it for choreographed
 * sections where the motion is the point.
 */
export const VIEWPORT_EARLY = { once: true, margin: '0px 0px 200px 0px', amount: 0 } as const;
export const VIEWPORT_PRECISE = { once: true, margin: '0px 0px -40px 0px', amount: 0.15 } as const;

/** Fade and rise. `distance` is the travel in px. */
export function fadeUp(distance = 30): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.entrance, ease: EASE },
    },
  };
}

/** Parent that drives `fadeUp` children in sequence. */
export function staggerContainer(stagger: number = STAGGER.base, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
