"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";

import { BillPDF } from "../BillPDF";
import { PDFViewer } from "@react-pdf/renderer";
import DownloadButton from "../ui/downloadPdf";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createTransactionBill } from "@/api/invoices/transaction";
import { setRefetch } from "@/redux/features/tableReducer";
import { useToast } from "../ui/use-toast";

import { X } from "lucide-react";
import useOutsideClick from "@/lib/hooks/useOutsideClick";
import { ProductData } from "@/types/table";
interface BillModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  resetFormFields: () => void;
}

const InvoiceModal = ({
  isModalOpen,
  setIsModalOpen,
  resetFormFields,
}: BillModalProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { invoiceData } = useAppSelector((state) => state.authReducer);
  const { refetch, dynamicTableData } = useAppSelector(
    (state) => state.tableReducer
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Hook to handle clicks outside the modal
  useOutsideClick(modalRef, () => {
    setIsModalOpen(false);
  });

  console.log(dynamicTableData);

  console.log(invoiceData);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log(invoiceData);
      const newData = {
        bill_for: invoiceData.bill_for,

        is_printed: invoiceData.is_printed,

        total_price: invoiceData.total_price,

        address: invoiceData.address,

        mode_of_payment: invoiceData.payment,

        Invoice_Item: invoiceData.Invoice_Item,

        paid_amt: invoiceData.paid_amt,

        credit_amt: invoiceData.credit_amt,

        contact_no: invoiceData.contact_no,

        remark: invoiceData.remarks,
      };
      const res = await createTransactionBill(newData);
      if (res.status === 201) {
        dispatch(setRefetch(!refetch));
        toast({
          variant: "default",
          title: "Bill Created",
          description: `Bill has been successfully created`,
        });
        resetFormFields();
        setIsModalOpen(false);
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

  return (
    <div className="z" id="billModal">
      <div
        ref={modalRef}
        className="sm:w-[773px] h-[90vh] bg-background px-6 py-8 relative space-y-4 shadow-lg sm:rounded-lg"
      >
        <PDFViewer className="w-full h-[75vh]">
          <BillPDF
            invoiceData={invoiceData}
            productData={dynamicTableData as ProductData[]}
          />
        </PDFViewer>
        <div className="flex justify-between gap-4">
          <DownloadButton
            invoiceData={invoiceData}
            productData={dynamicTableData as ProductData[]}
          />
          <Button disabled={isSubmitting} onClick={handleSubmit}>
            Generate Bill
          </Button>
        </div>
        <button
          className="absolute -top-3 right-0 text-black rounded-full p-1 hover:bg-slate-200"
          onClick={() => setIsModalOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceModal;
