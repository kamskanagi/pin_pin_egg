'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { isOrderingEnabled } from '@/lib/order/flag';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/about', key: 'about' },
  { href: '/menu', key: 'menu' },
  { href: '/locations', key: 'locations' },
  { href: '/news', key: 'news' },
  { href: '/contact', key: 'contact' },
] as const;

const orderingEnabled = isOrderingEnabled();

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations('nav');
  const tOrder = useTranslations('order');

  const ctaHref = orderingEnabled ? '/order' : '/locations';
  const ctaLabel = orderingEnabled ? tOrder('nav_cta') : t('find_store');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 z-40"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-cream z-50 p-8 flex flex-col"
          >
            <button
              onClick={onClose}
              className="self-end p-2 text-charcoal"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <nav className="mt-12 flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={onClose}
                  className="text-[15px] tracking-[2px] uppercase font-sans text-charcoal hover:text-warm-gold transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-6">
              <Link
                href={ctaHref}
                onClick={onClose}
                className="block rounded-sm bg-warm-gold px-5 py-3 text-center text-[13px] tracking-[1.5px] uppercase font-sans font-medium text-white transition-colors hover:bg-warm-gold-dark"
              >
                {ctaLabel}
              </Link>
              <LanguageSwitcher scrolled />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
