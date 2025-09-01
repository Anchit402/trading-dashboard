import { Button } from "@/components/ui/button";
import { useWatchListContext } from "@/Providers/WatchListProvider/WatchListProvider";
import { SymbolsAutocomplete } from "@/shared-components/SymbolAutocomplete/SymbolAutocomplete";
import type { SymbolDTO } from "@/types/symbols";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

function AddToWatchList() {
  const [watchListToAdd, setWatchListToAdd] = useState<SymbolDTO | undefined>(
    undefined
  );
  const { subscribedSymbols, onChangeInSubscribedSymbolsList } =
    useWatchListContext();

  const onWatchListSelected = useCallback((selectedSymbol: SymbolDTO) => {
    setWatchListToAdd(selectedSymbol);
  }, []);


  const onAddClicked = useCallback((symbol?: SymbolDTO) => {
    if (symbol) {
      const newWatchList = [...subscribedSymbols, symbol];
      onChangeInSubscribedSymbolsList(newWatchList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribedSymbols]);

  return (
    <div className="flex items-center gap-2">
      <SymbolsAutocomplete onWatchListSelected={onWatchListSelected} subscribedSymbols={[]} />
      <Button
        variant="outline"
        size="sm"
        disabled={!watchListToAdd}
        onClick={() => onAddClicked(watchListToAdd)}
      >
        <Plus />
      </Button>
    </div>
  );
}

export default AddToWatchList;
