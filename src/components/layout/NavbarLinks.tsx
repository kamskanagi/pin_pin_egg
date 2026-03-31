'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

interface NavbarLinksProps {
  scrolled: boolean;
}

const navItems = [
  { href: '/about', key: 'about' },
  { href: '/menu', key: 'menu' },
  { href: '/locations', key: 'locations' },
  { href: '/news', key: 'news' },
  { href: '/contact', key: 'contact' },
] as const;

export function NavbarLinks({ scrolled }: NavbarLinksProps) {
  const t = useTranslations('nav');

  return (
    <ul className="flex items-center gap-8">
      {navItems.map((item) => (
        <li key={item.key}>
          <Link
            href={item.href}
            className={cn(
              'text-[13px] tracking-[1.5px] uppercase font-sans transition-colors duration-300 hover:text-warm-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-gold rounded-sm',
              scrolled ? 'text-charcoal' : 'text-white'
            )}
          >
            {t(item.key)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
