"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CircleFadingPlus } from "lucide-react";

interface AddModalProps {
  type: string;
  activeTab?: string;
  subType?: string;
}

const FormModal = ({ type, activeTab, subType }: AddModalProps) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname.split("/")[1] === "dashboard";
  const { language } = useAppSelector((state) => state.dashboardReducer);

  const displayTitle = () => {
    switch (type) {
      case "Attendance":
        return "Meeting";

      case "Sub Report":
        return "Report";
      case "attendanceParliamentMember":
        return "Attendance";
      case "Sub Meeting":
        return "Meeting";

      case "bill2":
        return "Bill";

      case "Publication2":
        return "Publication";
      case "Report Card2":
        return "Report Card";
      default:
        return type;
    }
  };
  console.log(type);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex gap-1 h-10 px-4 text-gray-800 bg-secondary 
      hover:bg-primary hover:text-white text-base leading-5 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
            Add Product
          <CircleFadingPlus
            fontSize={16}
            className={`font-semibold ${isHovered ? "text-white" : ""}`}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[773px]  hide-scrollbar rounded-t-lg rounded-b-none modal-content"></DialogContent>
    </Dialog>
  );
};

export default FormModal;
