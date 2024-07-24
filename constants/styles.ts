import { StyleSheet, Font } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 40, // Adjusted for horizontal padding
    paddingVertical: 40, // Added vertical padding
  },
  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    borderBottom: "1px solid black",
    paddingBottom: 8,
  },
  titleText:{
  fontSize: 16,
  fontWeight: 'bold'
  },
  headerText: {
    fontSize: 14,
  },
  billTextContainer: {
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 4,
    marginTop: 8,
  },
  billText: {
    fontSize: 16,
    fontWeight: "bold",
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
    alignItems: "flex-start",
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 10,
  },
  calculation: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
    marginBottom: 50,
  },
  calculationCol1: {
    display: "flex",
    flex: '1',
    flexDirection: "column",
    gap: 5,
    marginBottom: 5,
  },
  calculationCol2:{
    display: "flex",
    maxWidth: '150px',
    flexDirection: "column",
    gap: 4,
    marginBottom: 5,
  },
  discount: {
    marginBottom: 4,
  },
  calculationTitle: {
    width: "30%",
  },
  calculationDesc: {
    width: "70%",
  },
  calculationRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
  },
  calculationText: {
    fontSize: 11,
  },
  inWordsText: {
    width: "100%", // Ensure it wraps within the available space
    fontSize: 11, // Adjust font size if needed
  },
  grandTotalText: {
    borderTop: "1px solid black",
    paddingTop: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
  signatureSection: {
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
  footer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  print: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

});