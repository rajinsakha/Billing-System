import React from "react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { BillPDF, BillPDFProps } from "../BillPDF";
import { Button } from "./button";
import { Download } from "lucide-react";

const DownloadButton = ({ invoiceData, productData }: BillPDFProps) => {
  const downloadPdf = async () => {
    const fileName = "test.pdf";
    const blob = await pdf(
      <BillPDF productData={productData} invoiceData={invoiceData} />
    ).toBlob();
    saveAs(blob, fileName);
  };

  return (
    <Button className="flex gap-2 bg-green-600 hover:bg-green-700" onClick={downloadPdf}>
      {" "}
      <Download color="white" /> Download PDF
    </Button>
  );
};

export default DownloadButton;
