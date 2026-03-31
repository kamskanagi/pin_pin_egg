import { cn } from '@/lib/utils';

interface BadgeProps {
  variant: 'signature' | 'seasonal' | 'new' | 'limited';
  children: string;
  className?: string;
}

const variantStyles: Record<string, string> = {
  signature: 'bg-warm-gold/10 text-warm-gold-dark',
  seasonal: 'bg-accent-coral/10 text-accent-coral',
  new: 'bg-accent-matcha/10 text-accent-matcha',
  limited: 'bg-charcoal/10 text-charcoal-light',
};

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-[11px] font-medium tracking-[1px] uppercase',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
