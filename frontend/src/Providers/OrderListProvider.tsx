import type { OrderDTO } from "@/types/orders";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface OrdersListContextType {
  orders: OrderDTO[];
  symbolSelected: OrderDTO["symbol"] | null;
  onOrderListChange: (orders: OrderDTO[]) => void;
  onSelectedSymbolChange: (symbol: OrderDTO["symbol"] | null) => void;
}

const OrdersListContext = createContext<OrdersListContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useOrdersListContext() {
  const context = useContext(OrdersListContext);
  if (!context)
    throw new Error(
      "useOrdersListContext must be used within a OrdersListProvider"
    );
  return context;
}

export function OrdersListProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [symbolSelected, setSymbolSelected] = useState<
    OrderDTO["symbol"] | null
  >(null);

  const onOrderListChange = (orders: OrderDTO[]) => {
    setOrders(orders);
  };

  const onSelectedSymbolChange = (symbol: OrderDTO["symbol"] | null) => {
    setSymbolSelected(symbol);
  };

  const contextValue: OrdersListContextType = useMemo(
    () => ({
      orders,
      symbolSelected,
      onOrderListChange,
      onSelectedSymbolChange,
    }),
    [orders, symbolSelected]
  );

  return (
    <OrdersListContext.Provider value={contextValue}>
      {children}
    </OrdersListContext.Provider>
  );
}
