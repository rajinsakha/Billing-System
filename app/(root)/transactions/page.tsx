"use client";

import DynamicTable from "@/components/DynamicTable";
import TablePagination from "@/components/TablePagination";
import AddModal from "@/components/modals/addModal";
import TitleText from "@/components/ui/titleText";
import useFetchData from "@/lib/hooks/useFetchData";
import useFetchDropdown from "@/lib/hooks/useFetchDropdown";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import Link from "next/link";

const Transaction = () => {
  const dispatch = useAppDispatch();
  const { loading: dropdownLoading, error: dropdownError } = useFetchDropdown();
  const { loading, error } = useFetchData("Transaction");
  const { dynamicTableData, refetch } = useAppSelector(
    (state) => state.tableReducer
  );

  const tableData: TableDataItem = {
    headers: [
      "S.N.",
      "Customer Name",
      "Total Price",
      "Added Date",
    ],
    data: dynamicTableData,
  };

  return (
    <div className="mt-[60px] space-y-4">
      <div className="flex gap-4 items-center">
     <TitleText title="Transaction" />
      </div>

      <DynamicTable
        headers={tableData.headers}
        data={tableData.data}
        type="Transaction"
      />

      <TablePagination />
    </div>
  );
};

export default Transaction;
