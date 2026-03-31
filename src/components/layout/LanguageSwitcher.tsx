'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales } from '@/lib/i18n/config';
import { localeNames, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  scrolled?: boolean;
}

export function LanguageSwitcher({ scrolled = true }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && (
            <span className={cn(
              'text-[10px]',
              scrolled ? 'text-charcoal-muted/30' : 'text-white/25'
            )}>
              /
            </span>
          )}
          <button
            onClick={() => handleChange(loc)}
            className={cn(
              'text-[11px] tracking-[1px] transition-colors duration-300 px-1 py-0.5 rounded',
              locale === loc
                ? 'text-warm-gold font-medium'
                : scrolled
                  ? 'text-charcoal-muted hover:text-charcoal'
                  : 'text-white/60 hover:text-white'
            )}
          >
            {localeNames[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
