import { Button } from "@/components/ui/button";
import { SymbolsAutocomplete } from "@/shared-components/SymbolAutocomplete/SymbolAutocomplete";
import type { SymbolDTO } from "@/types/symbols";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

function AddToWatchList() {
  const [watchListToAdd, setWatchListToAdd] = useState<SymbolDTO | undefined>(
    undefined
  );

  const onWatchListSelected = useCallback((selectedSymbol: SymbolDTO) => {
    setWatchListToAdd(selectedSymbol);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <SymbolsAutocomplete onWatchListSelected={onWatchListSelected} />
      <Button variant="outline" size="sm" disabled={!watchListToAdd}>
        <Plus />
      </Button>
    </div>
  );
}

export default AddToWatchList;
