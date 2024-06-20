
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Delete, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import EditModal from "./modals/editModal";
import DeleteModal from "./modals/deleteModal";
import { useAppSelector } from "@/redux/hooks";

const ToggleDropdown = () => {



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-[148px] rounded-sm`}  align="end">
        <EditModal />
        <DeleteModal />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToggleDropdown;
