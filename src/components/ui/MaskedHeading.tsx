'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MaskedHeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  /** Line breaks (`\n`) become separately revealed lines. */
  text: string;
  className?: string;
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function MaskedHeading({ as: Tag = 'h2', text, className }: MaskedHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const lines = text.split('\n');

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={cn(className)}>
      {lines.map((line, i) => (
        // The in-view check lives on the untransformed mask: the inner line starts
        // translated out of the clipped box, so observing it would never intersect.
        // Bottom padding keeps descenders from being clipped by the mask.
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.08em]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: '100%' }, visible: { y: '0%' } }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
