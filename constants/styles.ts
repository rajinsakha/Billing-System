import { StyleSheet } from "@react-pdf/renderer";


export const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      paddingHorizontal: 20,  // Adjusted for horizontal padding
      paddingVertical: 10,    // Added vertical padding
    },
    header: {
      textAlign:"center",
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
    mainContent: {
        flexGrow: 1,
      },
    calculation: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 50
    },
    calculationSection:{
      display:"flex",
      flexDirection:"column",
    },
    calculationRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: 4,
    },
    calculationText: {
      fontSize: 10,
    },
    signatureSection: {
     marginTop: "auto",
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

  });