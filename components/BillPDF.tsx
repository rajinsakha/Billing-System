
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { InvoiceData } from "@/types/products";


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  headSection: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export const BillPDF = ({invoiceData}:{invoiceData: InvoiceData}) => {


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headSection}>
          <Text>Phulchowki Pipes Suppliers</Text>
          <Text>Ward No.9, Suchitar, Lalitpur</Text>

          <View>
            <Text>Phone No: 9818123456</Text>
            <Text>PAN No: 9818123456</Text>
          </View>
        </View>
        <View>
          <Text>Customer Details</Text>
          <Text>Customer Name: {invoiceData.bill_for}</Text>
          
        </View>
      </Page>
    </Document>
  );
};
