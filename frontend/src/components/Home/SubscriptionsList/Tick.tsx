import { useSymbols } from "@/actions/symbols.action";
import { cn } from "@/lib/utils";
import type { TickDTO } from "@/types/tick";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Equal } from "lucide-react";
import { useMemo } from "react";

interface TickProps {
  tick: TickDTO;
  symbolToBeFiltered?: TickDTO["symbol"];
}

function Tick({ tick, symbolToBeFiltered: symbolToBeFiltered }: TickProps) {
  const { data: symbols } = useSymbols();

  const priceIcon = useMemo(() => {
    const closePrice =
      symbols?.find(({ symbol }) => tick.symbol === symbol)?.closePrice ?? 0;
    if (tick.price === closePrice) {
      return <Equal color="grey" />;
    }
    if (tick.price > closePrice) {
      return <ArrowUpNarrowWide color="green" />;
    }
    return <ArrowDownWideNarrow color="red" />;
  }, [symbols, tick]);

  const isFilteredCardClasses = useMemo(() => {
    return symbolToBeFiltered === tick.symbol ? "bg-blue-50" : "";
  }, [symbolToBeFiltered, tick.symbol]);

  return (
    <div
      className={cn(
        "flex items-center gap-10 p-2 rounded-sm border",
        isFilteredCardClasses
      )}
    >
      <div className="flex flex-col">
        <span className="text-sm">{tick.symbol}</span>
        <p className="text-xs">{tick.volume}</p>
      </div>
      <div className="flex items-center gap-1">
        ${tick.price}
        {priceIcon}
      </div>
    </div>
  );
}

export default Tick;
