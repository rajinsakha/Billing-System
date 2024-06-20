"use client";


import DynamicTable from "@/components/DynamicTable";
import { Input } from "@/components/ui/input";
import { calculateTotalPrice } from "@/lib/calculation";
import useFetchData from "@/lib/hooks/useFetchData";

import {  useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import {  useEffect, useState } from "react";

const Invoices = () => {
 
  const { loading, error } = useFetchData("Invoice");
  const { dynamicTableData } = useAppSelector((state) => state.tableReducer);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);


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
