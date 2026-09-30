import type { Variants } from 'framer-motion';

/**
 * Shared motion tokens. Pure data — no `'use client'`, so Server Components can
 * read durations and stagger values when passing props to client leaves.
 *
 * The curve mirrors `ease-out-expo` in `tailwind.config.ts`; keep the two in sync.
 */
export const EASE = [0.23, 1, 0.32, 1] as const;

/** Same curve for CSS-driven animation (inline styles, keyframes). */
export const EASE_CSS = 'cubic-bezier(0.23, 1, 0.32, 1)';

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
 * Scroll-trigger contract from the project spec (§4.5): fire once, slightly
 * before the element is fully in view.
 */
export const VIEWPORT = {
  once: true,
  margin: '0px 0px -40px 0px',
  amount: 0.15,
} as const;

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

/** Inner line of a clip-masked heading; the parent supplies `overflow-hidden`. */
export const maskLine: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: '0%',
    transition: { duration: DURATION.entrance, ease: EASE },
  },
};

/** Bottom-up reveal of a bounded box. `inset()` clip-paths composite cheaply. */
export const clipWipe: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: DURATION.entrance, ease: EASE },
  },
};
