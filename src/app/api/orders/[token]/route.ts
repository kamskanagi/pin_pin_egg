import { NextResponse } from 'next/server';
import { getOrder } from '@/lib/order/server-store';
import { isOrderingEnabled } from '@/lib/order/flag';

export async function GET(_request: Request, { params }: { params: { token: string } }) {
  if (!isOrderingEnabled()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const order = getOrder(params.token);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json(order);
}
