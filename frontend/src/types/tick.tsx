import type { OrderDTO } from "./orders";
import type { SymbolDTO } from "./symbols";

export type TickDTO = Pick<OrderDTO, "price" | "timestamp"> &
  Pick<SymbolDTO, "symbol"> & { volume: number };
