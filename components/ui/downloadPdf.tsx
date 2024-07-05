import React from 'react';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { BillPDF, BillPDFProps } from '../BillPDF';
import { Button } from './button';


const DownloadButton = ({invoiceData, productData}: BillPDFProps) => {
  const downloadPdf = async () => {
    const fileName = 'test.pdf';
    const blob = await pdf(<BillPDF productData={productData} invoiceData={invoiceData}/>).toBlob();
    saveAs(blob, fileName);
  };

  return <Button className='w-[120px]' onClick={downloadPdf}>Download PDF</Button>;
};

export default DownloadButton;