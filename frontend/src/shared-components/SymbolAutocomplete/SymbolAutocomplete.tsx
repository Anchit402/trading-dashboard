import { useSymbols } from '@/actions/symbols.action';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import type { SymbolDTO } from "@/types/symbols";
interface SymbolsAutocompleteProps {
  onWatchListSelected?: (selectedSymbol: SymbolDTO) => void;
  subscribedSymbols: SymbolDTO['symbol'][],
  placeholder?: string
}

export function SymbolsAutocomplete({
  onWatchListSelected,
  placeholder
}: SymbolsAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data: symbols } = useSymbols();
  const symbolOptions = React.useMemo(() => {
    return symbols?.filter(
      ({ symbol }) =>
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
          className="w-[200px] justify-between"
        >
          {value || placeholder || "Select Symbol..."}
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
