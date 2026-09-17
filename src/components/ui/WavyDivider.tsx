import { cn } from '@/lib/utils';

interface WavyDividerProps {
  className?: string;
}

/** Hand-drawn style wavy rule. Color follows `currentColor`. */
export function WavyDivider({ className }: WavyDividerProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 16"
      preserveAspectRatio="none"
      className={cn('block h-3 w-full text-warm-gold/40', className)}
    >
      <path
        d="M0 9 C 60 4, 120 13, 190 8 S 330 3, 410 9 S 560 14, 640 8 S 790 2, 870 8 S 1020 13, 1100 7 S 1170 6, 1200 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
