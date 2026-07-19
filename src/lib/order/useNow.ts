'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the current time, or null until the component has mounted on the client.
 * Server and the first client render always agree on `null` — wall-clock-dependent
 * UI (open/closed state, pickup slots) must render a loading state until this resolves,
 * which avoids hydration mismatches from time-dependent output.
 */
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  return now;
}
