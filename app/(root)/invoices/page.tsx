"use client";


import DynamicTable from "@/components/DynamicTable";
import InvoiceModal from "@/components/modals/invoiceModal";

import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/custom-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import ValidationMessage from "@/components/ui/validation-message";
import { calculateTotalPrice, generateDateTime, generateNepaliDate } from "@/lib/calculation";
import useFetchData from "@/lib/hooks/useFetchData";
import { setInvoiceData } from "@/redux/features/authReducer";
import { setRefetch } from "@/redux/features/tableReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import { useEffect, useState } from "react";

const Invoices = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { loading, error } = useFetchData("Invoice");
  const { dynamicTableData, refetch } = useAppSelector(
    (state) => state.tableReducer
  );
  const [customer, setCustomer] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [paymentMode, setPaymentMode] = useState<string | undefined>(undefined);
  const [contactNo, setContactNo] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] =
    useState<number>(0);
  const [finalDiscount, setFinalDiscount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [voucher, setVoucher] = useState<number>(0);
  const [errors, setErrors] = useState({
    customer: "",
    address: "",
    panNo: "",
    contactNo: "",
  });

  const tableData: TableDataItem = {
    headers: ["S.N.", "Name", "Quantity", "Total Price", "Added Date"],
    data: dynamicTableData,
  };

  useEffect(() => {
    const { totalPriceBeforeDiscount, finalPrice, finalDiscount } =
      calculateTotalPrice(dynamicTableData, discount, voucher);
    setTotalPriceBeforeDiscount(totalPriceBeforeDiscount);
    setFinalPrice(finalPrice);
    setFinalDiscount(finalDiscount);
  }, [dynamicTableData, discount, voucher]);

  const handleSelectChange = (value: string) => {
    setPaymentMode(value);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if (isNaN(value)) {
      setDiscount(0);
    } else {
      setDiscount(value);
    }
  };

  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if (isNaN(value)) {
      setVoucher(0);
    } else {
      setVoucher(value);
    }
  };

  const validateFields = () => {
    const newErrors = {
      customer: "",
      address: "",
      panNo: "",
      contactNo: "",
    };
    let isValid = true;

    if (!customer.trim()) {
      newErrors.customer = "Customer field is required";
      isValid = false;
    }
    if (!address.trim()) {
      newErrors.address = "Address field is required";
      isValid = false;
    }
    if (paymentMode === undefined) {
      newErrors.panNo = "Mode of Payment is required";
      isValid = false;
    }
    if (contactNo === null) {
      newErrors.contactNo = "Contact Number is required";
      isValid = false;
    }
    // if(paidAmount && paidAmount === null){
    //   newErrors.contactNo = "Paid Amount is required";
    // }

    setErrors(newErrors);
    return isValid;
  };

  const Ids = dynamicTableData?.map((item) => item.id);

  const handlePDFClick = () => {
    if (!validateFields()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill out all required fields.",
      });
      setIsModalOpen(false);
      return;
    }

    if (Ids.length === 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please add Products",
      });
      setIsModalOpen(false);
      return;
    }



    

    const formData = {
      bill_for: customer,
      is_printed: true,
      total_price: finalPrice,
      address: address,
      Invoice_Item: Ids,
      payment: paymentMode,
      contact_no: contactNo,
      discount: finalDiscount,
      price_before_discount: totalPriceBeforeDiscount,
      remarks: remarks,
      paid_amt: paymentMode === "cash" ? finalPrice :   paidAmount,
      credit_amt: paymentMode === "cash" ? 0 : finalPrice - (paidAmount || 0),
      invoice_date: generateNepaliDate(),
      invoice_miti: generateDateTime(true)
    };
    dispatch(setInvoiceData(formData));
    setIsModalOpen(true);
  };

  const resetFormFields = () => {
    setCustomer("");
    setAddress("");
    setRemarks("");
    setPaymentMode(undefined);
    setContactNo(null);
    setDiscount(0);
    setVoucher(0);
    setRemarks("");
    setPaidAmount(null);
    setErrors({
      customer: "",
      address: "",
      panNo: "",
      contactNo: "",
    });
  };



  return (
    <>
      <div className="mt-[60px] space-y-4">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <>
            <div className="grid max-sm:grid-cols-1 grid-cols-2 justify-end gap-2 px-2">
              <div className="flex items-center gap-2">
                <Label className=" w-[120px]">Customer Name:</Label>
                <Input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Enter Customer Name"
                  className="w-[220px]"
                />
                {errors.customer && (
                  <ValidationMessage message={errors.customer} />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Label className="max-sm:w-[120px] lg:w-[130px] w-[100px]">
                  Address:{" "}
                </Label>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Address"
                  className="w-[220px]"
                />
                {errors.address && (
                  <ValidationMessage message={errors.address} />
                )}
              </div>
              {/* <div className="flex items-center gap-2">
                <Label className="w-[120px]">PAN No: </Label>
                <Input
                  type="number"
                  value={panNo === null ? "" : panNo}
                  onChange={(e) =>
                    setPanNo(
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                  placeholder="Enter PAN Number"
                  className="w-[220px]"
                />
                {errors.panNo && <ValidationMessage message={errors.panNo} />}
              </div> */}
              <div className="flex items-center gap-2">
                <Label className="w-[120px]">Contact No: </Label>
                <Input
                  type="number"
                  value={contactNo === null ? "" : contactNo}
                  onChange={(e) =>
                    setContactNo(
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                  placeholder="Enter Contact Number"
                  className="w-[220px]"
                />
                {errors.contactNo && (
                  <ValidationMessage message={errors.contactNo} />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Label className="lg:w-[130px] w-[100px]">
                  Mode of Payment:{" "}
                </Label>
                <Select value={paymentMode} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select Mode of Payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                  </SelectContent>
                </Select>
                {errors.panNo && <ValidationMessage message={errors.panNo} />}
              </div>

      
            </div>

            <DynamicTable
              headers={tableData.headers}
              data={tableData.data}
              type="Invoice"
            />

            <div className="flex justify-between max-sm:flex-col gap-5 !mt-4 px-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CustomInput
                  label="Discount"
                  placeholder="Enter Discount (in %)"
                  handleChange={handleDiscountChange}
                />
                <CustomInput
                  label="Voucher"
                  placeholder="Enter Voucher (in %)"
                  handleChange={handleVoucherChange}
                />
                <div className="flex items-center gap-2">
                  <Label className="">Remarks: </Label>
                  <Input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter Remarks"
                    className="w-[220px]"
                  />
                </div>
                {paymentMode === "credit" && <div className="flex items-center gap-2">
                <Label className="">Amount: </Label>
                <Input
                  type="number"
                  value={paidAmount === null ? "" : paidAmount}
                  onChange={(e) =>
                    setPaidAmount(
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                  placeholder="Enter Paid Amount"
                />
              </div>}
              </div>

              <div className="space-y-1">
                <p>Sub Total: Rs {totalPriceBeforeDiscount}</p>
                <p>Discount: Rs {finalDiscount}</p>
                <p className="pt-2 border-solid border-t border-gray-600">
                  Grand Total: Rs {finalPrice}
                </p>
              </div>

              <Button onClick={handlePDFClick} className="max-sm:w-[120px]">
                Generate Bill
              </Button>
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <InvoiceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          resetFormFields={resetFormFields}
        />
      )}
    </>
  );
};

export default Invoices;
