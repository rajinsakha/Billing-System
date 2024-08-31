"use client";
import { Pencil, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";


import { useAppSelector } from "@/redux/hooks";
import ProductForm from "../forms/ProductForm";
import CategoryForm from "../forms/CategoryForm";
import SubCategoryForm from "../forms/SubCategoryForm";
import TransactionForm from "../forms/TransactionForm";
import ImportTransactionForm from "../forms/ImportTransactionForm";
const EditModal = () => {
  const { type, singleData } = useAppSelector((state) => state.tableReducer);

  return (
    <Dialog>
      <DialogTrigger className="w-full flex items-center gap-2 py-3 px-4 hover:bg-secondary cursor-pointer" >
        <Pencil className="h-5 w-5" />
        <p className="text-[13.4px] leading-5 text-textColor">Edit</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[773px]    hide-scrollbar rounded-t-lg rounded-b-none">
        {type === "Product" && <ProductForm initialData={singleData} />}
        {type === "Category" && <CategoryForm initialData={singleData} />}
        {type === "SubCategory" && <SubCategoryForm initialData={singleData} />}
        {type === "Transaction" && <TransactionForm initialData={singleData} /> }
        {type === "Import" && <ImportTransactionForm initialData={singleData} />}
      </DialogContent>
    </Dialog>
  );
};
export default EditModal;
