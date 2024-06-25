
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IFilterDropdown } from "@/types/dashboard";
import { useState } from "react";
import { Button } from "./ui/button";

interface Option {
  id: number | string;
  name: string;
}

const FilterDropdown = ({
  placeholder,
  width,
  options,
  handleChange,
  defaultValue,
}: IFilterDropdown<Option>) => {
    const [key, setKey] = useState(+new Date())
    const [value, setValue] = useState<string | undefined>(defaultValue)
  let propsWidth = width;


  return (
    <Select
    key={key}
      defaultValue={defaultValue}
      onValueChange={(value) => handleChange(value)}
      value={value}
    >
      <SelectTrigger
        className={`${propsWidth} h-[34px] text-input text-sm border-b border-b-input hover:border-b-primary rounded-none px-0 focus:outline-none 
"bg-white"
        `}
      >
        <SelectValue defaultValue={defaultValue} placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className={`h-[100%] max-h-56  overflow-y-scroll scroll-container ${propsWidth}`}
      >
          <Button
            className="w-full px-2"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setValue(undefined)
              setKey(+new Date())
            }}
          >
            Clear
          </Button>
        {options.map((option, index) => (
          <SelectItem
            key={index}
            value={option?.id ? option.id.toString() : ""}
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterDropdown;
