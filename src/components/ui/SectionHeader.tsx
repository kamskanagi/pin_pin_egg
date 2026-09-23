import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label: string;
  title: string;
  alignment?: 'center' | 'left';
  theme?: 'light' | 'dark';
  as?: 'h1' | 'h2';
}

export function SectionHeader({
  label,
  title,
  alignment = 'center',
  theme = 'light',
  as = 'h2',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-16',
        alignment === 'center' && 'text-center'
      )}
    >
      <p
        className={cn(
          'text-xs tracking-[4px] uppercase mb-4',
          theme === 'light' ? 'text-warm-gold' : 'text-warm-gold-light'
        )}
      >
        {label}
      </p>
      <MaskedHeading
        as={as}
        text={title}
        className={cn(
          'font-serif italic text-4xl md:text-5xl font-light',
          theme === 'dark' && 'text-white'
        )}
      />
    </div>
  );
}
