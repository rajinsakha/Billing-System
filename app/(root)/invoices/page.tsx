"use client";

import { getAllInvoices } from "@/api/products/product";
import DynamicTable from "@/components/DynamicTable";
import { Input } from "@/components/ui/input";
import { calculateTotalPrice } from "@/lib/calculation";
import useFetchData from "@/lib/hooks/useFetchData";
import {
  setDynamicData,
  setDynamicTableData,
} from "@/redux/features/tableReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import { useCallback, useEffect, useState } from "react";

const Invoices = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useFetchData("Invoice");
  const { dynamicTableData } = useAppSelector((state) => state.tableReducer);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  // const getData = useCallback(async () => {
  //   try {
  //     const res = await getAllInvoices();
  //     if (res.status === 200) {
  //       dispatch(setDynamicData(res.data));
  //       dispatch(setDynamicTableData(res.data?.results));
  //       console.log(res.data.results);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  const tableData: TableDataItem = {
    headers: ["S.N.", "Name", "Quantity", "Total Price", "Added Date"],
    data: dynamicTableData,
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(dynamicTableData, discount));
  }, [dynamicTableData, discount]);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if (isNaN(value)) {
      setDiscount(0);
    } else {
      setDiscount(value);
    }
  };

  return (
    <div className="mt-[60px] space-y-4">
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {!loading && !error && (
      <>
        <DynamicTable
          headers={tableData.headers}
          data={tableData.data}
          type="Invoice"
        />
        <Input 
          type="number" 
          placeholder="Enter Discount Rate" 
          min={0}
          max={100}
          onChange={handleDiscountChange} 
        />
        <div > 
          <p>Discount Percentage: {discount}%</p>
          <p>Total Price: Rs {totalPrice}</p>
        </div>
      </>
    )}
  </div>
  );
};

export default Invoices;
