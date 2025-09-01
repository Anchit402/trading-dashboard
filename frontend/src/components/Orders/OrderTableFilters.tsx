import { SymbolsAutocomplete } from "@/shared-components/SymbolAutocomplete/SymbolAutocomplete";
import { Button } from "../ui/button";

function OrderTableFilters() {
  return (
    <div className="flex items-center gap-2">
      <SymbolsAutocomplete subscribedSymbols={[]} placeholder="Filter by symbol" />
      <Button variant="outline" size="sm">
        Clear
      </Button>
    </div>
  );
}

export default OrderTableFilters;
