"use client";

import DynamicTable from "@/components/DynamicTable";
import TablePagination from "@/components/TablePagination";

import TitleText from "@/components/ui/titleText";
import useFetchData from "@/lib/hooks/useFetchData";
import useFetchDropdown from "@/lib/hooks/useFetchDropdown";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";

import { useState } from "react";

const Transaction = () => {
  const dispatch = useAppDispatch();
  const { loading: dropdownLoading, error: dropdownError } = useFetchDropdown();
  const { loading, error } = useFetchData("Transaction");
  const { dynamicTableData, refetch } = useAppSelector(
    (state) => state.tableReducer
  );
  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);


  const tableData: TableDataItem = {
    headers: [
      "S.N.",
      "Customer Name",
      "Total Price",
      "Mode of Payment",
      "Paid Amount",
      "Credit Amount",
      "Contact No.",
      "Added Date",
    ],
    data: dynamicTableData,
  };

  // const handleCategoryChange = (value: string) => {
  //   const categoryId = Number(value);
  //   setSelectedCategory(categoryId);
  //   dispatch(
  //     setCriteria({
  //       category: categoryId,
  //     })
  //   );
  // };

  return (
    <div className="mt-[60px] space-y-4">
      <div className="flex gap-4 items-center justify-between max-sm:flex-col">
     <TitleText title="Transaction" />
     <div className=" flex items-center gap-2 justify-end">
        <p>Filter By:</p>
        {/* <FilterDropdown
          placeholder="Select Category"
          width="w-[200px]"
          options={categoryDropdown}
          handleChange={handleCategoryChange}
        /> */}
      </div>
      </div>

      <DynamicTable
        headers={tableData.headers}
        data={tableData.data}
        type="Transaction"
      />

      <TablePagination type="Transaction" />
    </div>
  );
};

export default Transaction;
