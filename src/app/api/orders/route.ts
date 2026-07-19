import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkoutSchema } from '@/lib/schemas/order';
import { storeLocations } from '@/lib/placeholder-data';
import { findOrderableItem } from '@/lib/order/catalog';
import { computeUnitPriceTwd, isOptionsComplete } from '@/lib/order/pricing';
import { newOrderToken, nextPickupNumber, saveOrder } from '@/lib/order/server-store';
import { processPayment } from '@/lib/order/payment';
import type { CartItem, Order } from '@/types/order';

const createOrderSchema = z.object({
  storeId: z.string().min(1),
  slot: z.string().min(1),
  items: z
    .array(
      z.object({
        cartItemId: z.string(),
        itemId: z.string(),
        quantity: z.number().int().positive().max(50),
        options: z.record(z.array(z.string())),
        unitPriceTwd: z.number(), // recomputed server-side below; client value is untrusted
      })
    )
    .min(1),
  customer: checkoutSchema,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = createOrderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { storeId, slot, items, customer } = result.data;

    const store = storeLocations.find((s) => s.id === storeId && s.country === 'taiwan');
    if (!store) {
      return NextResponse.json({ error: 'Unknown or unsupported store' }, { status: 400 });
    }

    // Recompute pricing and item existence server-side — never trust client-supplied prices.
    const resolvedItems: CartItem[] = [];
    for (const line of items) {
      const catalogItem = findOrderableItem(line.itemId);
      if (!catalogItem) {
        return NextResponse.json({ error: `Unknown item: ${line.itemId}` }, { status: 400 });
      }
      if (!isOptionsComplete(catalogItem, line.options)) {
        return NextResponse.json(
          { error: `Missing required options for item: ${line.itemId}` },
          { status: 400 }
        );
      }
      resolvedItems.push({
        cartItemId: line.cartItemId,
        itemId: line.itemId,
        quantity: line.quantity,
        options: line.options,
        unitPriceTwd: computeUnitPriceTwd(catalogItem, line.options),
      });
    }

    const totalTwd = resolvedItems.reduce((sum, i) => sum + i.unitPriceTwd * i.quantity, 0);

    const order: Order = {
      token: newOrderToken(),
      storeId,
      slot,
      items: resolvedItems,
      totalTwd,
      customer,
      status: 'pending_payment',
      pickupNumber: nextPickupNumber(storeId),
      createdAt: new Date().toISOString(),
    };

    const paymentResult = await processPayment(order);
    order.status = paymentResult === 'paid' ? 'paid' : 'failed';
    saveOrder(order);

    if (paymentResult === 'failed') {
      return NextResponse.json({ error: 'Payment failed', token: order.token }, { status: 402 });
    }

    return NextResponse.json({ token: order.token, pickupNumber: order.pickupNumber, status: order.status });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
