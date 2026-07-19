'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { isOrderingEnabled } from '@/lib/order/flag';
import { NavbarLinks } from './NavbarLinks';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';

const orderingEnabled = isOrderingEnabled();

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('nav');
  const tOrder = useTranslations('order');
  const pathname = usePathname();

  const ctaHref = orderingEnabled ? '/order' : '/locations';
  const ctaLabel = orderingEnabled ? tOrder('nav_cta') : t('find_store');

  // Only use transparent/white navbar on the homepage (which has a dark hero)
  const isHomepage = pathname === '/' || pathname === '/en' || pathname === '/ja';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-homepage pages, always use the "scrolled" (dark text) style
  const showDark = scrolled || !isHomepage;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
        showDark
          ? 'bg-cream/88 backdrop-blur-xl border-b border-warm-gold/15'
          : 'bg-transparent'
      )}
    >
      <nav aria-label="Main navigation" className="flex items-center justify-between px-6 md:px-12 py-4 max-w-content mx-auto">
        <Link
          href="/"
          className={cn(
            'font-serif text-2xl tracking-[3px] transition-colors duration-300',
            showDark ? 'text-charcoal' : 'text-white'
          )}
        >
          品品 Café
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavbarLinks scrolled={showDark} />
          <LanguageSwitcher scrolled={showDark} />
          <Link
            href={ctaHref}
            className={cn(
              'rounded-sm px-5 py-2 text-xs tracking-[1.5px] uppercase font-sans font-medium transition-colors duration-300',
              showDark
                ? 'bg-warm-gold text-white hover:bg-warm-gold-dark'
                : 'border border-white/50 text-white hover:bg-white hover:text-charcoal'
            )}
          >
            {ctaLabel}
          </Link>
        </div>

        <button
          className={cn(
            'md:hidden p-2 transition-colors',
            showDark ? 'text-charcoal' : 'text-white'
          )}
          onClick={() => setMobileOpen(true)}
          aria-label={t('menu')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
