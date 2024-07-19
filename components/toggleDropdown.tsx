"use client"
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import EditModal from "./modals/editModal";
import DeleteModal from "./modals/deleteModal";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";


const ToggleDropdown = () => {
  
  return (
    <Popover>
      <PopoverTrigger>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[148px] rounded-sm`} align="end">
        <EditModal />
        <DeleteModal isSeparate={false} />

      </PopoverContent>
    </Popover>
  );
};

export default ToggleDropdown;
