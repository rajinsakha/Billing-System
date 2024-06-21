"use client";

import DynamicTable from "@/components/DynamicTable";
import TablePagination from "@/components/TablePagination";
import AddModal from "@/components/modals/addModal";
import useFetchData from "@/lib/hooks/useFetchData";
import useFetchDropdown from "@/lib/hooks/useFetchDropdown";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import Link from "next/link";

const Inventory = () => {
  const dispatch = useAppDispatch();
  const { loading: dropdownLoading, error: dropdownError } = useFetchDropdown();
  const { loading, error } = useFetchData("Inventory");
  const { dynamicTableData, refetch } = useAppSelector(
    (state) => state.tableReducer
  );

  const tableData: TableDataItem = {
    headers: [
      "S.N.",
      "Name",
      "Price",
      "Stock Quantity",
      "Category",
      "Sub-Category",
      "Added Date",
    ],
    data: dynamicTableData,
  };

  return (
    <div className="mt-[60px] space-y-4">
      <div className="flex gap-4 items-center justify-end">
        <Link href="/category" className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-800">Go to Category</Link>
        <AddModal type="Sub Category" />
        <AddModal type="Product" />
      </div>

      <DynamicTable
        headers={tableData.headers}
        data={tableData.data}
        type="Product"
      />

      <TablePagination />
    </div>
  );
};

export default Inventory;
