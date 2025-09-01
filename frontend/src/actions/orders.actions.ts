import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "@/types/api";
import type { OrderDTO } from "@/types/orders";

async function fetchOrdersBySymbol(symbol: OrderDTO['symbol']) {
  try {
    const { data: response } = await api.get<null, ApiResponse<OrderDTO[]>>(
      `orders/${symbol}`
    );

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (exception) {
    throw new Error(exception?.toString() ?? "Error in finding symbols");
  }
}

export function useOrders(symbol: OrderDTO['symbol']) {
  return useQuery({
    queryKey: ["order", symbol],
    queryFn: () => fetchOrdersBySymbol(symbol),
  });
}
