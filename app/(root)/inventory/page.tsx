"use client";

import DynamicTable from "@/components/DynamicTable";
import TablePagination from "@/components/TablePagination";
import FilterDropdown from "@/components/filterDropdown";
import AddModal from "@/components/modals/addModal";
import TitleText from "@/components/ui/titleText";
import useFetchData from "@/lib/hooks/useFetchData";
import useFetchDropdown from "@/lib/hooks/useFetchDropdown";
import { setCriteria, setSearchQuery } from "@/redux/features/filterReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import Link from "next/link";
import { useEffect, useState } from "react";

const Inventory = () => {
  const dispatch = useAppDispatch();
  const { loading: dropdownLoading, error: dropdownError } = useFetchDropdown();
  const {searchQuery, criteria} = useAppSelector((state)=>state.filterReducer)
  const { loading, error } = useFetchData("Inventory",searchQuery, criteria);
  const { dynamicTableData,  categoryDropdown } = useAppSelector(
    (state) => state.tableReducer
  );
  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);

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

  const handleCategoryChange = (value: string) => {
    const categoryId = Number(value);
    setSelectedCategory(categoryId);
    dispatch(
      setCriteria({
        category: categoryId,
      })
    );
  };


  return (
    <div className="mt-[60px] space-y-6">
      <div className="flex gap-4 items-center justify-between">
        <TitleText title="Inventory" />
        <div className="flex gap-4">
          <Link
            href="/category"
            className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-800"
          >
            Go to Category
          </Link>
          <AddModal type="Product" />
        </div>
      </div>

      <div className="flex justify-end">
        <p>Filter By:</p>
        <FilterDropdown
          placeholder="Category"
          width="w-[220px]"
          options={categoryDropdown}
          handleChange={handleCategoryChange}
        />
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
