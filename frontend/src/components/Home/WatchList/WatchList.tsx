import { useWatchListContext } from "@/Providers/WatchListProvider/WatchListProvider";

import AddToWatchList from "./AddToWatchList";
import WatchSymbol from "./WatchSymbol";
import { useCallback } from "react";
import type { SymbolDTO } from "@/types/symbols";

function WatchList() {
  const { subscribedSymbols, onChangeInSubscribedSymbolsList } =
    useWatchListContext();

  const onDeleteSymbol = useCallback(
    (symbolToBeDeleted: SymbolDTO) => {
      const newWatchList = subscribedSymbols.filter(
        ({ symbol }) => symbol !== symbolToBeDeleted.symbol
      );
      onChangeInSubscribedSymbolsList(newWatchList);
    },
    [onChangeInSubscribedSymbolsList, subscribedSymbols]
  );

  return (
    <div className="w-1/4">
      <h2>WatchList</h2>
      <AddToWatchList />
      <div className="flex flex-col gap-2 mt-3">
        {subscribedSymbols.map((symbol) => (
          <WatchSymbol
            key={symbol.symbol}
            symbol={symbol}
            onDeleteSymbol={onDeleteSymbol}
          />
        ))}
      </div>
    </div>
  );
}

export default WatchList;
