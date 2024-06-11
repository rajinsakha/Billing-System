"use client";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineModeEdit } from "react-icons/md";





import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
const EditModal = () => {
  const { type, } = useAppSelector(
    (state) => state.tableReducer
  );

  const pathname = usePathname();
  const subType = pathname.split('/').pop();

  const { activeTab } = useAppSelector((state) => state.authReducer);
  const { language } = useAppSelector((state) => state.dashboardReducer);

  console.log(type);

  return (
    <Dialog>
      <DialogTrigger className="w-full flex items-center gap-2 py-3 px-4 hover:bg-secondary cursor-pointer">
        <MdOutlineModeEdit fontSize={20} />
        <p className="text-[13.4px] leading-5 text-textColor">
          {language === "EN" ? "Edit" : "सम्पादन गर्नुहोस्"}
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[773px]    hide-scrollbar rounded-t-lg rounded-b-none">
    
      </DialogContent>
    </Dialog>
  );
};
export default EditModal;
