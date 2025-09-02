import type { SymbolDTO } from "./symbols";

export interface OrderDTO extends Pick<SymbolDTO, "symbol"> {
  id: number;
  side: "SELL" | "BUY";
  qty: number;
  price: number;
  timestamp: number;
}

export type PostOrderReq = Pick<OrderDTO, 'symbol' | 'price' | 'qty' | 'side'>