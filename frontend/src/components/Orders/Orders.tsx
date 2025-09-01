import { OrdersListProvider } from '@/Providers/OrderListProvider';

import { OrdersDataTable } from './OrderTable';

function Orders() {
  return (
    <div className="flex flex-col gap-2">
      <h1>Orders</h1>
      <OrdersListProvider>
        <OrdersDataTable />
      </OrdersListProvider>
    </div>
  );
}

export default Orders;
