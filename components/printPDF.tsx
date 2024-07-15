import { pdf } from '@react-pdf/renderer';

import { BillPDF } from './BillPDF';
import { InvoiceData } from '@/types/products';
import { ProductData } from '@/types/table';


export const printPDF = async (invoiceData:InvoiceData, productData:ProductData[]) => {
  const blob = await pdf(<BillPDF invoiceData={invoiceData} productData={productData} />).toBlob();
  const url = URL.createObjectURL(blob);
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  iframe.onload = () => {
    iframe.contentWindow?.print();
  };
};
