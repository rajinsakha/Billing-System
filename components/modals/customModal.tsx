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
interface BillModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  resetFormFields: () => void;
}

const CustomModal = ({ isModalOpen, setIsModalOpen, resetFormFields }: BillModalProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { invoiceData } = useAppSelector((state) => state.authReducer);
  const { refetch } = useAppSelector((state) => state.tableReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Hook to handle clicks outside the modal
  useOutsideClick(modalRef, () => {
    setIsModalOpen(false);
  });


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createTransactionBill(invoiceData);
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
      <div ref={modalRef} className="sm:w-[773px] h-[95vh] bg-white p-8 relative space-y-4">
        <PDFViewer className="w-full h-[80vh]">
          <BillPDF invoiceData={invoiceData} />
        </PDFViewer>
        <div className="flex gap-4">
          <DownloadButton invoiceData={invoiceData} />
          <Button disabled={isSubmitting} onClick={handleSubmit}>Generate Bill</Button>
        </div>
        <Button
          className="absolute top-0 right-1"
          onClick={() => setIsModalOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CustomModal;
