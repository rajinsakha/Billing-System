import React from 'react';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { BillPDF } from '../BillPDF';
import { Button } from './button';
import { InvoiceData } from '@/types/products';

const DownloadButton = ({invoiceData}:{invoiceData: InvoiceData}) => {
  const downloadPdf = async () => {
    const fileName = 'test.pdf';
    const blob = await pdf(<BillPDF invoiceData={invoiceData}/>).toBlob();
    saveAs(blob, fileName);
  };

  return <Button className='w-[120px]' onClick={downloadPdf}>Download PDF</Button>;
};

export default DownloadButton;