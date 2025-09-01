import { Button } from "@/components/ui/button";
import type { SymbolDTO } from "@/types/symbols";
import { Trash } from "lucide-react";
import { useCallback } from "react";

interface WatchSymbolProps {
  symbol: SymbolDTO;
  onDeleteSymbol?: (symbol: SymbolDTO) => void;
}

function WatchSymbol({ symbol, onDeleteSymbol }: WatchSymbolProps) {

  const onDeleteSymbolClicked = useCallback(() => {
    onDeleteSymbol?.(symbol);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex items-center gap-10 bg-blue-50 p-2 rounded-sm">
      <div className="flex flex-col">
        <span className="text-sm">{symbol.symbol}</span>
        <p className="text-xs">${symbol.closePrice}</p>
      </div>
      <h3>{symbol.name}</h3>

      <Button variant="outline" size="sm" className="ml-auto" onClick={onDeleteSymbolClicked}>
        <Trash />
      </Button>
    </div>
  );
}

export default WatchSymbol;
