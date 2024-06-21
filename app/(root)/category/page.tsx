"use client";

import DynamicTable from "@/components/DynamicTable";
import TablePagination from "@/components/TablePagination";
import AddModal from "@/components/modals/addModal";
import TitleText from "@/components/ui/titleText";
import useFetchData from "@/lib/hooks/useFetchData";
import useFetchDropdown from "@/lib/hooks/useFetchDropdown";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


const Category = () => {
  const dispatch = useAppDispatch();
  const {loading, error} = useFetchData("Category")
  const { dynamicTableData } = useAppSelector((state) => state.tableReducer);



  const tableData: TableDataItem = {
    headers: [
      "S.N.",
      "Category Name",
      "No. of Sub-Category",
    ],
    data: dynamicTableData,
  };

  return (
    <div className="mt-[60px] space-y-8">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-8">
        <Link href="/inventory" className="p-2 bg-secondary rounded-full"><ArrowLeft /></Link>
        <TitleText title="Category" />
        </div>
     
      <AddModal type="Category"/>
      </div>
     
      <DynamicTable
        headers={tableData.headers}
        data={tableData.data}
        type="Category"
      />


    </div>
  );
};

export default Category;
