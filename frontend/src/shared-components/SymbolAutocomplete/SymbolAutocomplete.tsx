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
import type { SymbolDTO } from "@/types/symbols";
import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

interface SymbolsAutocompleteProps {
  onWatchListSelected: (selectedSymbol: SymbolDTO) => void
}

export function SymbolsAutocomplete({ onWatchListSelected }: SymbolsAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data: symbolOptions } = useSymbols();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || "Select Symbol..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Symbols..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Symbol found.</CommandEmpty>
            <CommandGroup>
              {(symbolOptions ?? []).map((symbol) => (
                <CommandItem
                  key={symbol.symbol}
                  value={symbol.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onWatchListSelected(symbol)
                    setOpen(false);
                  }}
                >
                  {symbol.symbol}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
