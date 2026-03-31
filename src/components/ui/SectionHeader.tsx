import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label: string;
  title: string;
  alignment?: 'center' | 'left';
  theme?: 'light' | 'dark';
}

export function SectionHeader({
  label,
  title,
  alignment = 'center',
  theme = 'light',
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
      <h2
        className={cn(
          'font-serif text-4xl font-normal',
          theme === 'dark' && 'text-white'
        )}
      >
        {title}
      </h2>
    </div>
  );
}
