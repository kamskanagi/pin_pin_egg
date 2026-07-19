/** Online ordering is opt-in: off by default until ECPay + Supabase are wired for production. */
export function isOrderingEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ORDERING_ENABLED === 'true';
}
