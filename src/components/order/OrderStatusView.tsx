'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { storeLocations } from '@/lib/placeholder-data';
import { findOrderableItem, formatOptionsSummary } from '@/lib/order/catalog';
import { useCart } from '@/lib/order/CartContext';
import type { Order, OrderStatus } from '@/types/order';

interface OrderStatusViewProps {
  token: string;
}

const statusKeys: Record<OrderStatus, string> = {
  pending_payment: 'status_pending_payment',
  paid: 'status_paid',
  ready: 'status_ready',
  completed: 'status_completed',
  failed: 'order_error',
};

export function OrderStatusView({ token }: OrderStatusViewProps) {
  const t = useTranslations('order');
  const locale = useLocale();
  const { clear } = useCart();
  const [order, setOrder] = useState<Order | null | 'loading' | 'error'>('loading');
  const clearedRef = useRef(false);
  const clearFnRef = useRef(clear);
  clearFnRef.current = clear;

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/orders/${token}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: Order) => {
        if (cancelled) return;
        setOrder(data);
        // The order is confirmed saved server-side, so it's now safe to empty the
        // cart — this runs here (not on submit) so it can't race the navigation
        // away from /order/checkout. Guarded to fire once per mount.
        if (!clearedRef.current) {
          clearedRef.current = true;
          clearFnRef.current();
        }
      })
      .catch(() => {
        if (!cancelled) setOrder('error');
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (order === 'loading') {
    return <p className="text-center text-charcoal-muted">…</p>;
  }

  if (order === 'error' || order === null) {
    return (
      <div className="text-center">
        <p className="text-accent-coral mb-8">{t('order_error')}</p>
        <Button href="/order" variant="outline">
          {t('order_again')}
        </Button>
      </div>
    );
  }

  const store = storeLocations.find((s) => s.id === order.storeId);
  const storeName = store
    ? locale === 'ja'
      ? store.nameJa
      : locale === 'en'
        ? store.nameEn
        : store.nameZh
    : order.storeId;

  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-xs tracking-[4px] uppercase text-warm-gold mb-4">{t('status_title')}</p>
        <span className="font-serif text-[clamp(56px,10vw,96px)] font-light tracking-[4px] text-charcoal block leading-none">
          {order.pickupNumber}
        </span>
        <p className="mt-3 text-sm text-charcoal-muted">{t(statusKeys[order.status])}</p>
      </div>

      <div className="rounded-xl bg-white p-7 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-charcoal-light">{t('status_store')}</span>
          <span className="font-medium text-charcoal">{storeName}</span>
        </div>
        <div className="flex justify-between text-sm mb-6">
          <span className="text-charcoal-light">{t('status_slot')}</span>
          <span className="font-medium text-charcoal">{order.slot}</span>
        </div>

        <div className="flex flex-col gap-3 border-t border-charcoal/10 pt-4">
          {order.items.map((line) => {
            const item = findOrderableItem(line.itemId);
            if (!item) return null;
            const name = locale === 'ja' ? item.nameJa : locale === 'en' ? item.nameEn : item.nameZh;
            const summary = formatOptionsSummary(item, line.options, locale);
            return (
              <div key={line.cartItemId} className="flex justify-between text-sm">
                <span className="text-charcoal-muted">
                  {line.quantity}× {name}
                  {summary && <span className="text-xs"> ({summary})</span>}
                </span>
                <span className="text-charcoal">{formatPrice(line.unitPriceTwd * line.quantity)}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-charcoal/10">
          <span>{t('total')}</span>
          <span className="text-warm-gold-dark">{formatPrice(order.totalTwd)}</span>
        </div>
      </div>

      <div className="text-center">
        <Button href="/order" variant="outline">
          {t('order_again')}
        </Button>
      </div>
    </div>
  );
}
