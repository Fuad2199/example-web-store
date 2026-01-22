import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md">
      <Search className="w-4 h-4 text-gray-500"/>
      <input type="text" id="search" placeholder="Search..." className="text-sm outline-none"/>
    </div>
  );
};
