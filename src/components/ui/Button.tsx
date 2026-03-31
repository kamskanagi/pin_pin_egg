'use client';

import { type ReactNode } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'outline' | 'solid' | 'white' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<string, string> = {
  outline:
    'border border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
  solid: 'bg-charcoal text-white hover:bg-charcoal-light',
  white: 'bg-white text-charcoal hover:bg-cream-dark',
  gold: 'bg-warm-gold text-white hover:bg-warm-gold-dark',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-5 py-2 text-xs tracking-[1.5px]',
  md: 'px-8 py-3 text-[13px] tracking-[2px]',
  lg: 'px-10 py-4 text-[13px] tracking-[2px]',
};

export function Button({
  variant = 'outline',
  size = 'md',
  href,
  children,
  className,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const styles = cn(
    'inline-block rounded-sm uppercase font-sans font-medium transition-all duration-300',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
