"use client";
import { getAllProducts } from "@/api/products/product";
import DynamicTable from "@/components/DynamicTable";
import TablePagination from "@/components/TablePagination";
import AddModal from "@/components/modals/addModal";
import { setDynamicData, setDynamicTableData } from "@/redux/features/tableReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import React, { useCallback, useEffect } from "react";

const Inventory = () => {
  const dispatch = useAppDispatch();
  const { dynamicTableData } = useAppSelector((state) => state.tableReducer);

  const getData = useCallback(async () => {
    try {
      const res = await getAllProducts();
      if (res.status === 200) {
        dispatch(setDynamicData(res.data));
        dispatch(setDynamicTableData(res.data?.results));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

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
      <AddModal type="Category"/>
      <AddModal type="Sub Category"/>
      <AddModal type="Product"/>
      </div>
     
      <DynamicTable
        headers={tableData.headers}
        data={tableData.data}
        type="products"
      />

      <TablePagination />

    </div>
  );
};

export default Inventory;
