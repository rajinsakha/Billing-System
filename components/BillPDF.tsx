import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { InvoiceData } from "@/types/products";
import InvoiceTable from "./InvoiceTable";
import { ProductData } from "@/types/table";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    paddingRight: 10
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    borderBottom: "1px solid black",
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 12,
  },
  detailsSection: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid black",
    paddingBottom: 8,
  },
  detailsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"flex-start",
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 10,
  },
  tableSection: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid black",
    paddingBottom: 8,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid black",
    paddingBottom: 4,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
  },
  tableRowText: {
    fontSize: 10,
  },
  footer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
  },
  footerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
  },
  footerText: {
    fontSize: 10,
  },
  signatureSection: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderTop: "1px solid black",
    paddingTop: 4,
    width: "30%",
  },
  signatureText: {
    fontSize: 10,
  },
});

export interface BillPDFProps {
  invoiceData: InvoiceData;
  productData: ProductData[];
}

// Create Document Component
export const BillPDF = ({ invoiceData, productData }: BillPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
      <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Phulchowki Pipes Suppliers</Text>
            <Text style={styles.headerText}>Ward No.9, Suchitar, Lalitpur</Text>
          </View>

          <View>
            <Text style={styles.headerText}>Phone No: 9818123456</Text>
            <Text style={styles.headerText}>PAN No: 9818123456</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>Customer Name: {invoiceData.bill_for}</Text>
            <Text style={styles.detailsText}>Invoice No.: 1</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>Address: {invoiceData.address}</Text>
            <Text style={styles.detailsText}>Invoice Date: July 7, 2024</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>PAN No: {invoiceData.pan_number}</Text>
            <Text style={styles.detailsText}>Invoice Miti: Ashar 19, 2081</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>Contact No: {invoiceData.contact_number}</Text>
            <Text style={styles.detailsText}>MODE OF PAYMENT: CASH</Text>
          </View>
        </View>

      <InvoiceTable data={productData} />

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Total: {invoiceData.total_price}</Text>
            <Text style={styles.footerText}>Discount: {invoiceData.discount} </Text>
          </View>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Taxable Value: </Text>
            <Text style={styles.footerText}>VAT: </Text>
          <View>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Grand Total: {invoiceData.total_price}</Text>
          </View>
        </View>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Receivers Signature</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Prepared By</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Authorized Signatory</Text>
          </View>
        </View>
       </View>
      </Page>
    </Document>
  );
};
