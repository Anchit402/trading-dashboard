import type { OrderDTO } from "@/types/orders";
import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";

interface OrdersListContextType {
  orders: OrderDTO[];
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
  const contextValue: OrdersListContextType = useMemo(
    () => ({ orders: [] }),
    []
  );

  return (
    <OrdersListContext.Provider value={contextValue}>
      {children}
    </OrdersListContext.Provider>
  );
}
