"use client";
import { getAllProducts, getCategory, getSubCategory } from "@/api/products/product";
import DynamicTable from "@/components/DynamicTable";
import TablePagination from "@/components/TablePagination";
import AddModal from "@/components/modals/addModal";
import { setCategoryDropdown, setDynamicData, setDynamicTableData, setSubCategoryDropdown } from "@/redux/features/tableReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import React, { useCallback, useEffect } from "react";

const Inventory = () => {
  const dispatch = useAppDispatch();
  const { dynamicTableData, refetch } = useAppSelector((state) => state.tableReducer);

  const getData = useCallback(async () => {
    try {
      const res = await getAllProducts();
      const categoryRes = await getCategory();
      const subCategoryRes = await getSubCategory();
      if (res.status === 200) {
        dispatch(setDynamicData(res.data));
        dispatch(setDynamicTableData(res.data?.results));
      }
      if(categoryRes.status === 200){
        dispatch(setCategoryDropdown(categoryRes.data));
      }
      if(subCategoryRes.status === 200){
       dispatch(setSubCategoryDropdown(subCategoryRes.data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData, refetch]);

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
        type="Product"
      />

      <TablePagination />

    </div>
  );
};

export default Inventory;
