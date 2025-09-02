import { OrdersListProvider } from "@/Providers/OrderListProvider";
import { OrdersDataTable } from "./OrderTable";
import AddOrder from "./AddOrder";

function Orders() {
  return (
    <div className="flex flex-col gap-2">
      <OrdersListProvider>
        <div className="flex items-center gap-3">
          <h1>Orders</h1>
          <AddOrder />
        </div>
        <OrdersDataTable />
      </OrdersListProvider>
    </div>
  );
}

export default Orders;
