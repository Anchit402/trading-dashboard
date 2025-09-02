import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Side } from "@/enums/side";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

const SIDE_SELECT_OPTIONS = Object.values(Side);

type SideSelectProps = {
  name?: string;
  value: Side;
  className?: string;
  onChange: (value: Side) => void;
};

export function SideSelect({
  name,
  value,
  className,
  onChange,
}: SideSelectProps) {
  const onValueChange = useCallback((v: Side) => onChange(v), []);

  return (
    <Select name={name} value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn(className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Side</SelectLabel>
          {SIDE_SELECT_OPTIONS.map((option) => {
            return (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
