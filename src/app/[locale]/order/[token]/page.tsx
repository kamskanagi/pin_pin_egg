import { OrderStatusView } from '@/components/order/OrderStatusView';

export default function OrderStatusPage({ params }: { params: { token: string } }) {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="mx-auto max-w-[640px]">
        <OrderStatusView token={params.token} />
      </div>
    </div>
  );
}
