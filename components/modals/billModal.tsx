"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { BillPDF } from "../BillPDF";
import { PDFViewer } from "@react-pdf/renderer";
import DownloadButton from "../ui/downloadPdf";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createTransactionBill } from "@/api/invoices/transaction";
import { setRefetch } from "@/redux/features/tableReducer";
import { useToast } from "../ui/use-toast";

interface BillModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  resetFormFields: () => void;
}

const BillModal = ({
  isModalOpen,
  setIsModalOpen,
  resetFormFields,
}: BillModalProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { invoiceData } = useAppSelector((state) => state.authReducer);
  const { refetch, dynamicTableData } = useAppSelector((state) => state.tableReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="">Generate Bill</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[773px] h-[95vh] hide-scrollbar rounded-t-lg rounded-b-none modal-content">
        <PDFViewer className="w-full h-[80vh]">
          <BillPDF invoiceData={invoiceData} productData={dynamicTableData}  />
        </PDFViewer>
        <div className="flex gap-4">
          <DownloadButton invoiceData={invoiceData} />
          <Button onClick={handleSubmit}>Generate Bill</Button>
        </div>
     
      </DialogContent>
    </Dialog>
  );
};

export default BillModal;
