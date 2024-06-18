"use client";
import { Pencil, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";


import { useAppSelector } from "@/redux/hooks";
import ProductForm from "../forms/ProductForm";
const EditModal = () => {
  const { type, singleData } = useAppSelector((state) => state.tableReducer);

  console.log(singleData);

  return (
    <Dialog>
      <DialogTrigger className="w-full flex items-center gap-2 py-3 px-4 hover:bg-secondary cursor-pointer" >
        <Pencil className="h-5 w-5" />
        <p className="text-[13.4px] leading-5 text-textColor">Edit</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[773px]    hide-scrollbar rounded-t-lg rounded-b-none">
        {type === "Product" && <ProductForm initialData={singleData} />}
      </DialogContent>
    </Dialog>
  );
};
export default EditModal;
