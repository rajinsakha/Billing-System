"use client";
import { createTransactionBill } from "@/api/invoices/transaction";
import DynamicTable from "@/components/DynamicTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { calculateTotalPrice } from "@/lib/calculation";
import useFetchData from "@/lib/hooks/useFetchData";
import { setRefetch } from "@/redux/features/tableReducer";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import { useEffect, useState } from "react";

const Invoices = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { loading, error } = useFetchData("Invoice");
  const { dynamicTableData, refetch } = useAppSelector((state) => state.tableReducer);
  const [customer, setCustomer] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const Ids = dynamicTableData?.map(item => item.id);


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!customer.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Customer field is required",
      });
      return;
    }

    setIsSubmitting(true);
    try{
      const formData = {
        bill_for: "rajin",
        is_printed: true,
        total_price: totalPrice,
        Invoice_Item: Ids,
      };
  
      const res = await createTransactionBill(formData);
      if(res.status === 201){
        setCustomer("")
        dispatch(setRefetch(!refetch));
        toast({
          variant: "default",
          title: "Bill Created",
          description: `Bill has been successfully created`,
        });
      }
    }catch(error){
      toast({
        variant: "destructive",
        title: "Error Occured",
        description: `Error Occured: ${error}`,
      });
    }finally {
      setIsSubmitting(false);
    }

  };



  return (
    <div className="mt-[60px] space-y-4">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
        <div className="flex items-center w-[300px]">
        <Label className="w-[80px]">Bill For: </Label>
        <Input type="text" value={customer} onChange={(e)=>setCustomer(e.target.value)}/>

        </div>
    
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
          <div className="flex items-center justify-between">
            <div>
              <p>Discount Percentage: {discount}%</p>
              <p>Total Price: Rs {totalPrice}</p>
            </div>

            <Button onClick={handleSubmit} disabled={isSubmitting}>Generate Bill</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Invoices;
