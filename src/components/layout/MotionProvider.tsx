'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Makes `prefers-reduced-motion` the framework-level default so components
 * don't each have to branch on it. Components still call `useReducedMotion()`
 * where reduced motion needs a *different layout* rather than a shorter
 * animation (see PhilosophyStrip's sticky track).
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
