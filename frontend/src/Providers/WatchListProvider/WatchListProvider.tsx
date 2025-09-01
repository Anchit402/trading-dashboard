import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { SymbolDTO } from "@/types/symbols";
interface WatchListContextType {
  subscribedSymbols: SymbolDTO[];
  onChangeInSubscribedSymbolsList: (symbols: SymbolDTO[]) => void;
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

  const onChangeInSubscribedSymbolsList = useCallback(
    (symbols: SymbolDTO[]) => {
      setSubscribedSymbols(symbols.slice());
    },
    []
  );

  const contextValue: WatchListContextType = useMemo(
    () => ({ subscribedSymbols, onChangeInSubscribedSymbolsList }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subscribedSymbols]
  );

  return (
    <WatchListContext.Provider value={contextValue}>
      {children}
    </WatchListContext.Provider>
  );
}

export default WatchListProvider;
