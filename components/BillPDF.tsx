import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { InvoiceData } from "@/types/products";
import InvoiceTable from "./InvoiceTable";
import { ProductData } from "@/types/table";
import { ToWords } from "to-words";
import { styles } from "@/constants/styles";
import { generateDateTime } from "@/lib/calculation";

// Create styles

export interface BillPDFProps {
  invoiceData: InvoiceData;
  productData: ProductData[];
}

// Create Document Component
export const BillPDF = ({ invoiceData, productData }: BillPDFProps) => {
  const toWords = new ToWords({
    localeCode: "en-NP",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
        
            <Text style={styles.titleText}>
              Phulchowki Pipes Fitting Suppliers
            </Text>
            <Text style={styles.headerText}>Kathmandu, Nepal</Text>
          </View>

          <View>
            <Text style={styles.headerText}>Phone No: 9851157901</Text>
            <Text style={styles.headerText}>PAN No: 619242851</Text>
          </View>

          <View style={styles.billTextContainer}>
            <Text style={styles.billText}>ESTIMATE BILL</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>
              Customer Name: {invoiceData.bill_for}
            </Text>
            <Text style={styles.detailsText}>Invoice No.: 1</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>
              Address: {invoiceData.address}
            </Text>
            <Text style={styles.detailsText}>
              Invoice Date: {invoiceData.invoice_date}
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>
              Contact No: {invoiceData.contact_no}
            </Text>
            <Text style={styles.detailsText}>
              Invoice Miti: {invoiceData.invoice_miti}
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>
              MODE OF PAYMENT: {invoiceData.payment.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* <View style={styles.mainContent}> */}
        <InvoiceTable data={productData} />
        <View style={styles.calculation}>
          <View style={styles.calculationCol1}>
            <Text style={styles.calculationText}>
              In Words:{" "}
              <Text style={styles.inWordsText}>
                {toWords.convert(invoiceData.total_price)}
              </Text>
            </Text>
            <Text style={styles.calculationText}>
              Remarks: {invoiceData.remarks}
            </Text>
            {invoiceData.payment === "credit" && (
              <Text style={styles.calculationText}>
                Paid Amount:{" "}
                {new Intl.NumberFormat("en-IN", {
                   minimumFractionDigits: 2,
                maximumFractionDigits: 2,

                }).format(invoiceData.paid_amt)}
              </Text>
            )}
          </View>
          <View style={styles.calculationCol2}>
            <Text style={styles.calculationText}>
              Total: Rs{" "}
              {new Intl.NumberFormat("en-IN", {
                 minimumFractionDigits: 2,
                maximumFractionDigits: 2,

              }).format(invoiceData.price_before_discount)}
            </Text>
            <Text style={[styles.calculationText, styles.discount]}>
              Discount: Rs{" "}
              {new Intl.NumberFormat("en-IN", {
                 minimumFractionDigits: 2,
                maximumFractionDigits: 2,

              }).format(invoiceData.discount)}
            </Text>
            <Text style={styles.grandTotalText}>
              Grand Total: Rs{" "}
              {new Intl.NumberFormat("en-IN", {
                 minimumFractionDigits: 2,
                maximumFractionDigits: 2,

              }).format(invoiceData.total_price)}
            </Text>
          </View>
        </View>
        {/* </View> */}

        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Prepaid By</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Receiver&apos;s Signature</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.signatureText}>Thank You For Your Business</Text>
        </View>

        <View style={styles.print}>
          <Text style={styles.signatureText}>
            Print Date & Time: {generateDateTime()}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
