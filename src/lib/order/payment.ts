import type { Order } from '@/types/order';

/**
 * Stubbed payment step. A real implementation signs an ECPay CheckMacValue
 * server-side, redirects the browser to ECPay's hosted checkout page, and lets
 * ECPay's callback (POST /api/ecpay/callback) mark the order paid and trigger
 * e-invoice issuance. Until ECPay merchant credentials exist, this resolves
 * immediately so the ordering flow can be built and tested end to end.
 */
export async function processPayment(order: Order): Promise<'paid' | 'failed'> {
  void order;
  return 'paid';
}
