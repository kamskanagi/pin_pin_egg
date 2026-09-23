'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { isActiveHref, navItems } from './navItems';

interface NavbarLinksProps {
  scrolled: boolean;
}

export function NavbarLinks({ scrolled }: NavbarLinksProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-8">
      {navItems.map((item) => {
        const active = isActiveHref(pathname, item.href);
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'text-[13px] tracking-[1.5px] uppercase font-sans underline-offset-8 decoration-dotted transition-colors duration-300 rounded-sm',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold',
                scrolled
                  ? 'text-charcoal hover:text-warm-gold-dark hover:underline hover:decoration-warm-gold'
                  : 'text-white hover:text-warm-gold-light hover:underline hover:decoration-warm-gold-light',
                active && 'underline',
                active && (scrolled ? 'decoration-warm-gold' : 'decoration-warm-gold-light')
              )}
            >
              {t(item.key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
