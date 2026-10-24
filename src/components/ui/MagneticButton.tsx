'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  /** Maximum pull toward the cursor, in px. */
  strength?: number;
  className?: string;
}

/**
 * Opt-in cursor attraction for a single hero CTA.
 *
 * Deliberately not folded into `Button`: that component is used for form
 * submits, cart and checkout, where a control that drifts away from the
 * pointer is a usability problem rather than a flourish.
 *
 * Disabled under reduced motion and on coarse pointers, where there is no
 * cursor to be magnetic toward.
 */
export function MagneticButton({ children, strength = 8, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  // Resolved after mount: reading matchMedia during render gave the server
  // (no window) and the client different `style` props — a hydration mismatch.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches);
  }, [prefersReducedMotion]);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    // Normalise by half the box so the pull maxes out at the edges.
    x.set(Math.max(-1, Math.min(1, dx / (rect.width / 2))) * strength);
    y.set(Math.max(-1, Math.min(1, dy / (rect.height / 2))) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={enabled ? { x: springX, y: springY } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
