import { notFound } from 'next/navigation';
import { isOrderingEnabled } from '@/lib/order/flag';
import { CartProvider } from '@/lib/order/CartContext';

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  if (!isOrderingEnabled()) {
    notFound();
  }

  return <CartProvider>{children}</CartProvider>;
}
