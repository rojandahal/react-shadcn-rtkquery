import { type SelectOptions } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectOptionProps {
  options: SelectOptions[];
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder: string;
  isLoading: boolean;
  selectLabel: string;
}

const SelectOption = ({
  options,
  value,
  onChange,
  placeholder,
  isLoading,
  selectLabel,
}: SelectOptionProps) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {isLoading ? (
            <SelectItem value="" disabled>
              Loading...
            </SelectItem>
          ) : (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectOption;
