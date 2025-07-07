import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchBar({
  className,
  searchTerm,
  setSearchTerm,
  placeholder = "Search ...",
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search size={18} className="text-gray-400" />
      </div>
    </div>
  );
}
