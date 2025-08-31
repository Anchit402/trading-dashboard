import { Button } from "@/components/ui/button";
import { SymbolsAutocomplete } from "@/shared-components/SymbolAutocomplete/SymbolAutocomplete";
import { Plus } from "lucide-react";


function AddToWatchList() {

  return (
    <div className="flex items-center gap-2">
      <SymbolsAutocomplete />
      <Button variant="outline" size="sm">
        <Plus />
      </Button>
    </div>
  );
}

export default AddToWatchList;
