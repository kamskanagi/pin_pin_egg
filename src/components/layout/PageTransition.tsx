'use client';

import type { ReactNode } from 'react';
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
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.state, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
