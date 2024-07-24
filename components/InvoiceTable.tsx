import { ProductData } from "@/types/table";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderLeft: "1px solid #000",
    borderRight: "1px solid #000",
    borderCollapse: "collapse",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  header: {
    borderBottom: "1px solid #000",
  },
  bold: {
    fontWeight: "bold",
  },
  tableRowText: {
    fontSize: 10,
    padding: 5,
    borderBottom: "1px solid #000",
  },
  col1: {
    width: "5%",
    fontSize: 10,
    borderRight: "1px solid #000",
    padding: 5,
    textAlign: "center",
  },
  col2: {
    width: "43%",
    fontSize: 10,
    borderRight: "1px solid #000",
    padding: 5,
  },
  col3: {
    width: "10%",
    fontSize: 10,
    borderRight: "1px solid #000",
    padding: 5,
    textAlign: "center",
  },
  col4: {
    width: "8%",
    fontSize: 10,
    borderRight: "1px solid #000",
    padding: 5,
    textAlign: "center",
  },
  col5: {
    width: "8%",
    fontSize: 10,
    borderRight: "1px solid #000",
    padding: 5,
  },
  col6: {
    width: "11%",
    fontSize: 10,
    borderRight: "1px solid #000",
    padding: 5,
  },
  col7: {
    width: "15%",
    fontSize: 10,
    padding: 5,
  },
});

const InvoiceTable = ({ data }: { data: ProductData[] }) => {
  console.log(data);
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.col1,styles.bold,]}>S.N.</Text>
        <Text style={[styles.col2,styles.bold,]}>PARTICULARS</Text>
        <Text style={[styles.col3,styles.bold,]}>Alt. Qty</Text>
        <Text style={[styles.col4,styles.bold,]}>Qty</Text>
        <Text style={[styles.col5,styles.bold,]}>Unit</Text>
        <Text style={[styles.col6,styles.bold,]}>Rate</Text>
        <Text style={[styles.col7,styles.bold,]}>Amount</Text>
      </View>
      {data?.map((row, i) => (
        <View key={i} style={styles.row} wrap={false}>
          <Text style={[styles.col1, styles.tableRowText]}>{i + 1}</Text>
          <Text style={[styles.col2, styles.tableRowText]}>
            {row.product_info.label}
          </Text>
          <Text style={[styles.col3, styles.tableRowText]}>{1}</Text>
          <Text style={[styles.col4, styles.tableRowText]}>
            <Text style={styles.bold}>{row.quantity}</Text>
          </Text>
          <Text style={[styles.col5, styles.tableRowText]}>
            <Text style={[styles.bold]}>{row.product_info.unit}</Text>
          </Text>
          <Text style={[styles.col6, styles.tableRowText]}>
            {new Intl.NumberFormat("en-IN", {
              maximumFractionDigits: 2,
            }).format(row.product_info.price)}
          </Text>
          <Text style={[styles.col7, styles.tableRowText]}>
            {new Intl.NumberFormat("en-IN", {
              maximumFractionDigits: 2,
            }).format(row.total_price)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default InvoiceTable;
