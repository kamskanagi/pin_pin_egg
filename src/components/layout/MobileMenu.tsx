'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { isOrderingEnabled } from '@/lib/order/flag';
import { cn } from '@/lib/utils';
import { WavyDivider } from '@/components/ui/WavyDivider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { isActiveHref, navItems } from './navItems';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const orderingEnabled = isOrderingEnabled();
const EASE = [0.23, 1, 0.32, 1] as const;

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations('nav');
  const tOrder = useTranslations('order');
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

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
            transition={{ type: 'tween', duration: prefersReducedMotion ? 0 : 0.3, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label={t('mobile_nav')}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-paper text-charcoal z-50 p-8 flex flex-col"
          >
            <button
              type="button"
              onClick={onClose}
              className="self-end p-2 text-charcoal"
              aria-label={t('close_menu')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <nav className="mt-10">
              <ul className="flex flex-col gap-5">
                {navItems.map((item, i) => {
                  const active = isActiveHref(pathname, item.href);
                  return (
                    <motion.li
                      key={item.key}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'font-serif italic text-4xl font-light transition-colors hover:text-warm-gold-dark',
                          active && 'text-warm-gold-dark'
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto">
              <WavyDivider className="mb-6" />
              <Link
                href={ctaHref}
                onClick={onClose}
                className="group mb-6 inline-flex items-center gap-2 text-[13px] tracking-[1.5px] uppercase text-charcoal underline decoration-dotted decoration-warm-gold/60 underline-offset-8"
              >
                {ctaLabel}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <LanguageSwitcher scrolled />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
