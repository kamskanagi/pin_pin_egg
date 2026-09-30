'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from '@/lib/i18n/navigation';
import { DURATION, EASE } from '@/lib/motion';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Enter-only route fade.
 *
 * Deliberately not `AnimatePresence`: the App Router unmounts the outgoing
 * route before an exit animation can run, so a "crossfade" would only ever
 * play its second half. Keying on the pathname and animating in is the honest
 * version of that effect.
 *
 * Locale-stripped `usePathname` on purpose — switching language is the same
 * page, so it should not flash. Importing from `next/navigation` instead would
 * fade on every language switch.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <motion.div
      key={pathname}
      // `false` on the first mount. framer-motion serialises `initial` into the
      // SSR markup as an inline style, and this wrapper contains the whole page:
      // an `opacity: 0` here would hide the hero image, deferring the LCP
      // candidate until hydration and leaving no-JS visitors a blank page.
      initial={isFirstRender.current ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      // Opacity only, no `y`. A transform on this wrapper would make it the
      // containing block for every `position: fixed` descendant — CartBar is
      // one — and detach them from the viewport for the length of the fade.
      transition={{ duration: DURATION.state, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
