import { useQuery } from '@tanstack/react-query';

import { getAdminOrders } from '@shared/api-client';
import {
  Card,
  EmptyState,
  ErrorState,
  Spinner,
} from '@shared/ui';

export const OrdersPage = () => {
  const query = useQuery({
    queryKey: ['admin-orders'],
    queryFn: getAdminOrders,
  });

  if (query.isLoading) return <Spinner />;
  if (query.isError) return <ErrorState title="Could not load admin orders." />;
  if (!query.data?.items.length)
    return <EmptyState title="No exchange orders yet." />;

  return (
    <Card>
      <h1 className="text-2xl font-black text-slate-950">Orders</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="py-2">Order</th>
              <th>Status</th>
              <th>Pair</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {query.data.items.map((order) => (
              <tr key={order.orderId} className="border-b">
                <td className="py-3 font-semibold">{order.orderId}</td>
                <td>{order.status}</td>
                <td>
                  {order.fromCurrency} / {order.toCurrency}
                </td>
                <td>{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
