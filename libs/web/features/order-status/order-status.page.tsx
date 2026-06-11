import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getPublicOrder } from '@shared/api-client';
import {
  Card,
  EmptyState,
  ErrorState,
  Spinner,
} from '@shared/ui';

export const OrderStatusPage = () => {
  const { orderId } = useParams();
  const query = useQuery({
    queryKey: ['public-order', orderId],
    queryFn: () => getPublicOrder(orderId ?? ''),
    enabled: Boolean(orderId),
  });

  if (!orderId) return <EmptyState title="Order id is missing." />;
  if (query.isLoading) return <Spinner />;
  if (query.isError) return <ErrorState title="Could not load order status." />;
  if (!query.data) return <EmptyState title="Order not found." />;

  return (
    <Card>
      <h1 className="text-2xl font-black text-slate-950">
        Order {query.data.orderId}
      </h1>
      <p className="mt-2 text-slate-700">Status: {query.data.status}</p>
      <p className="text-sm text-slate-500">
        Payment confirmation and final processing are validated by the backend.
      </p>
    </Card>
  );
};
