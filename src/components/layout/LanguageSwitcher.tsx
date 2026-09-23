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
    <div className="flex items-center gap-3">
      {locales.map((loc) => {
        const active = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            lang={loc}
            aria-pressed={active}
            onClick={() => handleChange(loc)}
            className={cn(
              'text-[12px] tracking-[1px] underline-offset-[6px] decoration-dotted transition-colors duration-300',
              active && 'underline',
              scrolled
                ? active
                  ? 'text-charcoal decoration-warm-gold'
                  : 'text-charcoal-muted hover:text-charcoal'
                : active
                  ? 'text-white decoration-warm-gold-light'
                  : 'text-white/60 hover:text-white'
            )}
          >
            {localeNames[loc]}
          </button>
        );
      })}
    </div>
  );
}
