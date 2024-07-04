import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { InvoiceData } from "@/types/products";
import InvoiceTable from "./InvoiceTable";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
  },
  headSection: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
});

interface BillPDFProps {
  invoiceData: InvoiceData;
  productData: any[];
}

// Create Document Component
export const BillPDF = ({ invoiceData, productData }: BillPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headSection}>
          <View>
            <Text>Phulchowki Pipes Suppliers</Text>
            <Text>Ward No.9, Suchitar, Lalitpur</Text>
          </View>

          <View>
            <Text>Phone No: 9818123456</Text>
            <Text>PAN No: 9818123456</Text>
          </View>
        </View>


        <View>
          <Text>Customer Details</Text>
          <Text>Customer Name: {invoiceData.bill_for}</Text>
        </View>

        <InvoiceTable data={productData} />

        

    

        
      </Page>
    </Document>
  );
};
