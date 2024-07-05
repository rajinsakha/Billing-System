"use client";
import { createTransactionBill } from "@/api/invoices/transaction";
import { BillPDF } from "@/components/BillPDF";
import DynamicTable from "@/components/DynamicTable";
import BillModal from "@/components/modals/billModal";
import CustomModal from "@/components/modals/customModal";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/custom-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ValidationMessage from "@/components/ui/validation-message";
import { calculateTotalPrice } from "@/lib/calculation";
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
  const [address, setAddress] = useState<string>("");
  const [panNo, setPanNo] = useState<number | null>(null);
  const [contactNo, setContactNo] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] =
    useState<number>(0);
  const [finalDiscount, setFinalDiscount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [voucher, setVoucher] = useState<number>(0);
  const [remark, setRemark] = useState<string>("");
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
    const { totalPriceBeforeDiscount, finalPrice, finalDiscount } = calculateTotalPrice(
      dynamicTableData,
      discount,
      voucher
    );
    setTotalPriceBeforeDiscount(totalPriceBeforeDiscount);
    setFinalPrice(finalPrice);
    setFinalDiscount(finalDiscount);
  }, [dynamicTableData, discount, voucher]);

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
    if (panNo === null) {
      newErrors.panNo = "PAN Number is required";
      isValid = false;
    }
    if (contactNo === null) {
      newErrors.contactNo = "Contact Number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const Ids = dynamicTableData?.map((item) => item.id);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateFields()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill out all required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = {
        bill_for: customer,
        is_printed: true,
        total_price: finalPrice,
        address: address,
        Invoice_Item: Ids,
      };

      const res = await createTransactionBill(formData);
      if (res.status === 201) {
        setCustomer("");
        dispatch(setRefetch(!refetch));
        toast({
          variant: "default",
          title: "Bill Created",
          description: `Bill has been successfully created`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Occured",
        description: `Error Occured: ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      pan_number: panNo,
      contact_number:contactNo,
      discount:  finalDiscount
    };
    dispatch(setInvoiceData(formData));
    setIsModalOpen(true);
  };

  const resetFormFields = () => {
    setCustomer("");
    setAddress("");
    setPanNo(null);
    setContactNo(null);
    setDiscount(0);
    setVoucher(0);
    setRemark("");
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
            <div className="grid grid-cols-2 justify-end gap-2">
              <div className="flex items-center gap-2">
                <Label className="w-[120px]">Customer Name:</Label>
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
                <Label className="w-[100px]">Address: </Label>
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
              <div className="flex items-center gap-2">
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
              </div>
              <div className="flex items-center gap-2">
                <Label className="w-[100px]">Contact No: </Label>
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
            </div>

            <DynamicTable
              headers={tableData.headers}
              data={tableData.data}
              type="Invoice"
            />

            <div className="flex justify-between">
              <div className="flex gap-4">
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
              </div>

              <Button onClick={handlePDFClick}>Generate Bill</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex gap-4">
                  <p>Discount Percentage: {discount}%</p>
                  <p>Discount Voucher Rate: {voucher}%</p>
                </div>

                <p>
                  Total Price Before Discount: Rs {totalPriceBeforeDiscount}
                </p>
                <p>Total Price After Discount: Rs {finalPrice}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <CustomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          resetFormFields={resetFormFields}
        />
      )}
    </>
  );
};

export default Invoices;
