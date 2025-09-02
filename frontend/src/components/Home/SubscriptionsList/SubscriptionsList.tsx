import { useWatchListContext } from "@/Providers/WatchListProvider/WatchListProvider";
import Tick from "./Tick";
import { useState } from "react";
import type { TickDTO } from "@/types/tick";
import type { SymbolDTO } from "@/types/symbols";

export default function SubscriptionsList() {
  const { ticks } = useWatchListContext();

  const [symbolToBeFiltered, setSymbolToBeFiltered] = useState<
    SymbolDTO["symbol"] | undefined
  >(undefined);

  const onClicked = (symbol: TickDTO["symbol"]) => {
    setSymbolToBeFiltered(symbol);
  };

  return (
    <div className="p-4 border rounded-md w-1/4">
      <h2 className="text-lg font-bold">Live Tick Data</h2>
      <div className="mt-2 text-sm font-mono flex flex-col gap-2 h-full overflow-scroll">
        {ticks.map((tick, idx) => (
          <div onClick={() => onClicked(tick.symbol)}>
            <Tick
              key={idx}
              tick={tick}
              symbolToBeFiltered={symbolToBeFiltered}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
