import { useSymbols } from "@/actions/symbols.action";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import type { SymbolDTO } from "@/types/symbols";
import { cn } from "@/lib/utils";
interface SymbolsAutocompleteProps {
  onWatchListSelected?: (selectedSymbol: SymbolDTO) => void;
  subscribedSymbols?: SymbolDTO["symbol"][];
  placeholder?: string;
  name?: string;
  className?: string;
  selectedSymbol?: SymbolDTO['symbol'];
  onChange?: (value: string) => void;
}

export function SymbolsAutocomplete({
  onWatchListSelected,
  placeholder,
  name,
  className,
  selectedSymbol,
  onChange
}: SymbolsAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const { data: symbols } = useSymbols();
  const symbolOptions = React.useMemo(() => {
    return symbols?.filter(({ symbol }) =>
      symbols.find(
        ({ symbol: subscribedSymbol }) => symbol !== subscribedSymbol
      )
    );
  }, [symbols]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedSymbol || placeholder || "Select Symbol..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search Symbols..."
            className="h-9"
            name={name}
          />
          <CommandList>
            <CommandEmpty>No Symbol found.</CommandEmpty>
            <CommandGroup>
              {(symbolOptions ?? []).map((symbol) => (
                <CommandItem
                  key={symbol.symbol}
                  value={symbol.name}
                  onSelect={() => {
                    onChange?.(symbol.symbol);
                    onWatchListSelected?.(symbol);
                    setOpen(false);
                  }}
                >
                  {symbol.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
