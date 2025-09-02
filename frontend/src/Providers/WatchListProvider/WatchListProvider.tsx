import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { SymbolDTO } from "@/types/symbols";
interface WatchListContextType {
  subscribedSymbols: SymbolDTO[];
  onAddSubscription: (symbol: SymbolDTO) => void;
  onRemoveSubscription: (symbol: SymbolDTO) => void;
}

const WatchListContext = createContext<WatchListContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useWatchListContext() {
  const context = useContext(WatchListContext);
  if (!context)
    throw new Error(
      "useWatchListContext must be used within a WatchListProvider"
    );
  return context;
}

function WatchListProvider({ children }: PropsWithChildren) {
  const [subscribedSymbols, setSubscribedSymbols] = useState<SymbolDTO[]>([]);

  const onAddSubscription = (symbol: SymbolDTO) => {
    setSubscribedSymbols((prev) => [...prev, symbol].slice());
  };

  const onRemoveSubscription = (symbol: SymbolDTO) => {
    setSubscribedSymbols((prev) =>
      prev.filter((v) => v.symbol !== symbol.symbol)
    );
  };

  const contextValue: WatchListContextType = useMemo(
    () => ({ subscribedSymbols, onRemoveSubscription, onAddSubscription }),
    [subscribedSymbols]
  );

  return (
    <WatchListContext.Provider value={contextValue}>
      {children}
    </WatchListContext.Provider>
  );
}

export default WatchListProvider;
