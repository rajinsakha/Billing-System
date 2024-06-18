"use client"

import { getAllInvoices } from "@/api/products/product";
import DynamicTable from "@/components/DynamicTable";
import { setDynamicData, setDynamicTableData } from "@/redux/features/tableReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import { useCallback, useEffect } from "react";

const Invoices = () => {

  const dispatch = useAppDispatch();
  const { dynamicTableData } = useAppSelector((state) => state.tableReducer);

  const getData = useCallback(async () => {
    try {
      const res = await getAllInvoices();
      if (res.status === 200) {
        dispatch(setDynamicData(res.data));
        dispatch(setDynamicTableData(res.data?.results));
        console.log(res.data.results);
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
      "Quantity",
      "Total Price",
      "Added Date",
    ],
    data: dynamicTableData,
  };



  return (
    <div className="mt-[60px] space-y-4">
       <DynamicTable
        headers={tableData.headers}
        data={tableData.data}
        type="Invoice"
      />
    </div>
    
  )
}

export default Invoices