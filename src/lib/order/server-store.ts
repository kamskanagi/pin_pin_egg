import type { Order } from '@/types/order';
import { storeDateKey } from '@/lib/order/slots';

/**
 * In-memory order store for development/demo only — a module-level Map does not
 * survive server restarts and does not scale across serverless instances. Replace
 * with Supabase Postgres before production (see docs/ordering-flow-brief.md §9);
 * the function signatures below are the swap-in boundary.
 */
const orders = new Map<string, Order>();
const pickupCounters = new Map<string, number>();

export function saveOrder(order: Order): void {
  orders.set(order.token, order);
}

export function getOrder(token: string): Order | undefined {
  return orders.get(token);
}

export function nextPickupNumber(storeId: string): string {
  const today = storeDateKey(new Date());
  const key = `${storeId}:${today}`;
  const next = (pickupCounters.get(key) ?? 0) + 1;
  pickupCounters.set(key, next);
  return String(next).padStart(3, '0');
}

export function newOrderToken(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `order-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
