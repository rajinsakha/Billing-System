"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";

interface AddModalProps {
  type: string;
  activeTab?: string;
  subType?: string;
}

const AddModal = ({ type }: AddModalProps) => {
  
  const [isHovered, setIsHovered] = useState(false);
 




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

export default AddModal;
