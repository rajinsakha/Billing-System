"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/api/products/product";
import { useToast } from "../ui/use-toast";
import { setRefetch } from "@/redux/features/tableReducer";
import { deleteInvoice } from "@/api/invoices/invoice";
import { deleteCategory, deleteSubCategory } from "@/api/products/dropdown/dropdown";
import { deleteTransaction } from "@/api/invoices/transaction";

const DeleteModal = ({isSeparate}: { isSeparate?: boolean }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [deleteStatus, setDeleteStatus] = useState<boolean>(false);
  const { refetch, singleData, type } = useAppSelector(
    (state) => state.tableReducer
  );

  const handleDelete = async () => {
    let res;
    if (type === "Product") {
      res = await deleteProduct(singleData.id);
    }

    if (type === "Invoice") {
      res = await deleteInvoice(singleData.id);
    }

    if(type === "Category"){
      res = await deleteCategory(singleData.id);
    }

    if(type === "SubCategory"){
      res = await deleteSubCategory(singleData.id);
    }

    if(type === "Transaction"){
      res = await deleteTransaction(singleData.id);
    }

    if (res?.status === 204) {
      document.getElementById("closeDialog")?.click();
      dispatch(setRefetch(!refetch));
      toast({
        variant: "default",
        title: "Product Deleted",
        description: `Product has been successfully deleted`,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className={`w-full flex items-center gap-2 py-3 px-4 hover:bg-secondary cursor-pointer ${
         isSeparate && "bg-red-500 text-white hover:!bg-red-700 w-[105px] h-10 rounded-lg "
        } `}
      >
        <Trash2 className="h-5 w-5" />
        <p
          className={`
           text-[13.4px] leading-5`}
        >
          Delete
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[484px] rounded-t-lg rounded-b-none  py-4 px-5 flex flex-col justify-between gap-3">
        <DialogHeader className="pt-1 pb-4">
          <h1 className="text-textColor font-semibold text-2xl tracking-tight">
            Are you sure you want to delete?
          </h1>
        </DialogHeader>

        <p className="text-[13.4px] leading-[22px]">
          <span className="font-semibold">
            {singleData.title || singleData.name}
          </span>{" "}
          will be permanently deleted from the system. Do you want to delete?
        </p>
        <div className="flex justify-end pt-4 pb-2 gap-4">
          <DialogClose className="text-primary hover:text-red-800">
            Cancel
          </DialogClose>
          <Button
            disabled={deleteStatus}
            className={`${
              deleteStatus ? "bg-primary" : "bg-secondary"
            } text-textColor text-base font-semibold rounded-sm hover:bg-primary hover:text-white`}
            onClick={handleDelete}
          >
            {deleteStatus ? <div className="loader"></div> : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
