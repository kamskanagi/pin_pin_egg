import { NextResponse } from 'next/server';
import { getOrder } from '@/lib/order/server-store';

export async function GET(_request: Request, { params }: { params: { token: string } }) {
  const order = getOrder(params.token);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json(order);
}
