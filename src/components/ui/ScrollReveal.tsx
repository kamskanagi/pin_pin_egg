'use client';

import { createElement, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DURATION, EASE, STAGGER, VIEWPORT, staggerContainer } from '@/lib/motion';

type RevealTag = 'div' | 'li' | 'section' | 'article' | 'span';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  /** Element to render. Use `li` inside a `ul` so the wrapper stays valid markup. */
  as?: RevealTag;
  /** Travel distance in px. */
  distance?: number;
  /** Override the entrance duration, in seconds. */
  duration?: number;
  /**
   * Opt in to driving children instead of animating itself. Children must carry
   * `variants={fadeUp()}` and inherit their timing from this parent.
   */
  stagger?: number;
}

/** Unit vectors; multiplied by `distance` at render. */
const directionOffset = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  as = 'div',
  distance = 30,
  duration = DURATION.entrance,
  stagger,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return createElement(as, { className }, children);
  }

  const MotionTag = motion[as];

  if (stagger !== undefined) {
    return (
      <MotionTag
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer(stagger || STAGGER.base, delay)}
        className={cn(className)}
      >
        {children}
      </MotionTag>
    );
  }

  const offset = directionOffset[direction];

  return (
    <MotionTag
      initial={{ opacity: 0, x: offset.x * distance, y: offset.y * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
