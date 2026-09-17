import type { PlaceholderStore } from '@/lib/placeholder-data';
import type { TimeSlot } from '@/types/order';

const PREP_BUFFER_MINUTES = 15;
const SLOT_INTERVAL_MINUTES = 15;
const LAST_ORDER_BEFORE_CLOSE_MINUTES = 15;

/** All ordering stores are in Taiwan; wall-clock logic must not depend on the server's or browser's timezone. */
export const STORE_TIME_ZONE = 'Asia/Taipei';

function storeClockParts(now: Date): Record<'year' | 'month' | 'day' | 'hour' | 'minute', string> {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: STORE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '0';
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute') };
}

/** Minutes since midnight in store-local (Taiwan) time. */
function storeMinutesOfDay(now: Date): number {
  const { hour, minute } = storeClockParts(now);
  return Number(hour) * 60 + Number(minute);
}

/** YYYY-MM-DD in store-local (Taiwan) time. */
export function storeDateKey(now: Date): string {
  const { year, month, day } = storeClockParts(now);
  return `${year}-${month}-${day}`;
}

function parseHoursToMinutes(hours: string): { openMinutes: number; closeMinutes: number } | null {
  const match = hours.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const [, oh, om, ch, cm] = match;
  return {
    openMinutes: Number(oh) * 60 + Number(om),
    closeMinutes: Number(ch) * 60 + Number(cm),
  };
}

function formatMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function isStoreOpenNow(store: PlaceholderStore, now: Date): boolean {
  const parsed = parseHoursToMinutes(store.hoursEn);
  if (!parsed) return false;
  const nowMinutes = storeMinutesOfDay(now);
  return nowMinutes >= parsed.openMinutes && nowMinutes < parsed.closeMinutes;
}

/**
 * Generates 15-minute pickup slots for today, starting after a prep buffer past `now`.
 * Slot availability follows a fixed, deterministic pattern (not randomness) so server
 * and client render identically — every 5th slot is marked full to demonstrate the
 * "capacity full" state. Replace with real capacity data once orders are persisted.
 */
export function generateSlotsForToday(store: PlaceholderStore, now: Date): TimeSlot[] {
  const parsed = parseHoursToMinutes(store.hoursEn);
  if (!parsed) return [];

  const nowMinutes = storeMinutesOfDay(now);
  const earliest = Math.max(parsed.openMinutes, nowMinutes + PREP_BUFFER_MINUTES);
  const roundedEarliest = Math.ceil(earliest / SLOT_INTERVAL_MINUTES) * SLOT_INTERVAL_MINUTES;
  const latest = parsed.closeMinutes - LAST_ORDER_BEFORE_CLOSE_MINUTES;

  const slots: TimeSlot[] = [];
  let index = 0;
  for (let t = roundedEarliest; t <= latest; t += SLOT_INTERVAL_MINUTES) {
    slots.push({
      time: formatMinutes(t),
      available: index % 5 !== 3,
    });
    index += 1;
  }
  return slots;
}

/** Server-side check that a requested pickup slot is currently offered and has capacity. */
export function isSlotBookable(store: PlaceholderStore, slot: string, now: Date): boolean {
  return generateSlotsForToday(store, now).some((s) => s.time === slot && s.available);
}
