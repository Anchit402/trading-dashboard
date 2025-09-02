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

const SIDE_SELECT_OPTIONS = Object.values(Side);

type SideSelectProps = {
  name?: string;
  value: Side;
  className?: string;
};

export function SideSelect({ name, value, className }: SideSelectProps) {
  return (
    <Select name={name} value={value}>
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
