'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { isOrderingEnabled } from '@/lib/order/flag';
import { NavbarLinks } from './NavbarLinks';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';

const orderingEnabled = isOrderingEnabled();

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('nav');
  const tOrder = useTranslations('order');

  const ctaHref = orderingEnabled ? '/order' : '/locations';
  const ctaLabel = orderingEnabled ? tOrder('nav_cta') : t('find_store');

  // One solid cream bar everywhere, including over the homepage hero. A
  // transparent bar left the links sitting on busy footage, and a frosted one
  // blurred the strip of video underneath; an opaque bar does neither.
  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-charcoal/10"
      >
        <nav aria-label={t('main_nav')} className="flex items-center justify-between px-6 md:px-12 py-4">
          <Link
            href="/"
            className="flex items-baseline gap-2 transition-colors duration-300 text-charcoal"
          >
            <span className="font-serif-tc text-2xl tracking-[4px]">品品</span>
            <span className="font-serif italic text-2xl font-light">Café</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavbarLinks scrolled />
            <LanguageSwitcher scrolled />
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs tracking-[1.5px] uppercase font-sans font-medium transition-colors duration-300 border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-white"
            >
              {ctaLabel}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 transition-colors text-charcoal"
            onClick={() => setMobileOpen(true)}
            aria-label={t('open_menu')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Rendered outside <header> so the menu's fixed panel is never clipped to the bar. */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
