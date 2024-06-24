"use client";
import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useAppDispatch } from "@/redux/hooks";
import { setSearchQuery } from "@/redux/features/filterReducer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedValue = useDebounce(searchInput);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let searchTerm = e.target.value;
    setSearchInput(searchTerm);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    const search = debouncedValue.trim().split(" ").join("+");

    dispatch(setSearchQuery(search));
  }, [debouncedValue, dispatch]);

  return (
    <form>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <Input
          type="text"
          id="default-search"
          onChange={handleChange}
          className={`block w-[200px] sm:w-full p-4 ps-10 text-sm text-gray-900 
  "bg-white" 
          `}
          placeholder={"Search"}
          value={searchInput}
          required
        />
        {searchInput && (
          <Button
            variant="ghost"
            className="absolute inset-y-0 end-0  hover:bg-transparent hover:text-black"
            onClick={() => {
              dispatch(setSearchQuery(""));
              setSearchInput("");
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBox;
