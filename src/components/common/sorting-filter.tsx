import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { type SortKeyObject } from "@/types";

interface SortingFilterProps {
  sortKeys: SortKeyObject[];
  onSort: (sort: number, sortKey: string) => void;
  className?: string;
}

export default function SortingFilter({
  sortKeys,
  onSort,
  className,
}: SortingFilterProps) {
  const [sort, setSort] = useState<number>(-1);
  const [sortKey, setSortKey] = useState<string>("");

  return (
    <div className={cn("flex gap-2", className)}>
      <span>Sort by:</span>
      <Select value={sortKey} onValueChange={setSortKey}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a sort key" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort Key</SelectLabel>
            {sortKeys.map((obj, index) => (
              <SelectItem
                value={obj.value}
                key={index}
                className="hover:bg-primary-foreground hover:text-white"
              >
                {obj.key}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={sort === 1 ? "asc" : "desc"}
        onValueChange={(value) => setSort(value === "asc" ? 1 : -1)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Sort Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort Order</SelectLabel>
            <SelectItem
              value="asc"
              className="hover:bg-primary-foreground hover:text-white"
            >
              Ascending
            </SelectItem>
            <SelectItem
              value="desc"
              className="hover:bg-primary-foreground hover:text-white"
            >
              Descending
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={() => onSort(sort, sortKey)}>Sort</Button>
    </div>
  );
}
