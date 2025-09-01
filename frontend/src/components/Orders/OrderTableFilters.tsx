import { SymbolsAutocomplete } from "@/shared-components/SymbolAutocomplete/SymbolAutocomplete";
import { Button } from "../ui/button";
import type { SymbolDTO } from "@/types/symbols";
import { useCallback, useEffect, useState } from "react";
import { useOrders } from "@/actions/orders.actions";
import { useOrdersListContext } from "@/Providers/OrderListProvider";

function OrderTableFilters() {
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolDTO | null>(null);

  const onWatchListSelected = useCallback((symbol: SymbolDTO) => {
    setSelectedSymbol(symbol);
  }, []);

  const { data } = useOrders(selectedSymbol?.symbol ?? null);

  const { onOrderListChange, onSelectedSymbolChange } = useOrdersListContext();

  useEffect(() => {
    onOrderListChange(data ?? []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    onSelectedSymbolChange(selectedSymbol?.symbol ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSymbol])

  return (
    <div className="flex items-center gap-2">
      <SymbolsAutocomplete
        subscribedSymbols={[]}
        placeholder="Filter by symbol"
        onWatchListSelected={onWatchListSelected}
      />
      <Button variant="outline" size="sm">
        Clear
      </Button>
    </div>
  );
}

export default OrderTableFilters;
