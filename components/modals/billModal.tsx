"use client"
import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { BillPDF } from "../BillPDF";
import { PDFViewer } from "@react-pdf/renderer";
import DownloadButton from "../ui/downloadPdf";
import { useAppSelector } from "@/redux/hooks";

const BillModal = () => {
  const {invoiceData} = useAppSelector((state)=>state.authReducer);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex gap-1 h-10 px-4 text-gray-800 bg-secondary 
    hover:bg-primary hover:text-white text-base leading-5 relative"
        >
          Generate PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[773px] h-[95vh] hide-scrollbar rounded-t-lg rounded-b-none modal-content">
        <PDFViewer className="w-full h-[80vh]">
          <BillPDF invoiceData={invoiceData} />
        </PDFViewer>

        <DownloadButton invoiceData={invoiceData}  />
      </DialogContent>
    </Dialog>
  );
};

export default BillModal;
