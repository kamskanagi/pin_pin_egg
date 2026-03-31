'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackClassName?: string;
}

export function ImageWithFallback({
  fallbackClassName,
  className,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-cream-dark text-charcoal-muted',
          fallbackClassName ?? className
        )}
        role="img"
        aria-label={alt}
      >
        <span className="text-xs tracking-[2px] uppercase">品品</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
