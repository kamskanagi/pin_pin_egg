'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class that sizes the container, e.g. `aspect-[3/4]`. */
  aspect: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export function ParallaxImage({ src, alt, aspect, sizes, priority, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden bg-cream-dark', aspect, className)}>
      <motion.div className="absolute inset-0" style={prefersReducedMotion ? undefined : { scale }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}
