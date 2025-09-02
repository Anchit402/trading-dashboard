import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import type { SymbolDTO } from "@/types/symbols";
interface WatchListContextType {
  subscribedSymbols: SymbolDTO[];
  onAddSubscription: (symbol: SymbolDTO) => void;
  onRemoveSubscription: (symbol: SymbolDTO) => void;
  ticks: string[];
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
  const [ticks, setTicks] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws/ticks");
    wsRef.current = ws;

    ws.onmessage = (event: MessageEvent<string>) => {
      setTicks((prev) => [event.data, ...prev]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const onAddSubscription = (symbol: SymbolDTO) => {
    setSubscribedSymbols((prev) => [...prev, symbol].slice());
    wsRef.current?.send(
      JSON.stringify({ action: "subscribe", symbol: symbol.symbol })
    );
  };

  const onRemoveSubscription = (symbol: SymbolDTO) => {
    setSubscribedSymbols((prev) =>
      prev.filter((v) => v.symbol !== symbol.symbol)
    );
    wsRef.current?.send(
      JSON.stringify({ action: "unsubscribe", symbol: symbol.symbol })
    );
  };


  const contextValue: WatchListContextType = useMemo(
    () => ({
      subscribedSymbols,
      onRemoveSubscription,
      onAddSubscription,
      ticks,
    }),
    [subscribedSymbols, ticks]
  );

  return (
    <WatchListContext.Provider value={contextValue}>
      {children}
    </WatchListContext.Provider>
  );
}

export default WatchListProvider;
