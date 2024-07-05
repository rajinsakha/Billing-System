import { ProductData } from '@/types/table'
import { StyleSheet, Text, View } from '@react-pdf/renderer'


const styles = StyleSheet.create({
  table: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  tableRowText: {
    fontSize: 10,
  },
  // So Declarative and unDRY 👌
  col1: {
    width: '7%',
    fontSize: 10
  },
  col2: {
    width: '35%',
    fontSize: 10
  },
  col3: {
    width: '15%',
    fontSize: 10
  },
  col4: {
    width: '15%',
    fontSize: 10
  },
  col5: {
    width: '12%',
    fontSize: 10
  },
  col6:{
    width: '15%',
    fontSize: 10
  }
})

const InvoiceTable = ({data}:{data:ProductData[]}) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.col1}>S.N.</Text>
        <Text style={styles.col2}>PARTICULARS</Text>
        <Text style={styles.col3}>Alt. Qty</Text>
        <Text style={styles.col4}>Qty</Text>
        <Text style={styles.col5}>Rate</Text>
        <Text style={styles.col6}>Amount</Text>

      </View>
      {data?.map((row, i) => (
        <View key={i} style={styles.row} wrap={false}>
          <Text style={[styles.col1, styles.tableRowText]}>
            {i+1}
          </Text>
          <Text style={[styles.col2, styles.tableRowText]}>{row.product_info.label}</Text>
          <Text style={[styles.col3, styles.tableRowText]}>{1}</Text>
          <Text style={styles.col4}>
            <Text style={[styles.bold, styles.tableRowText]}>{row.quantity}</Text> 
          </Text>
          <Text style={[styles.col5, styles.tableRowText]}>{row.product_info.price}</Text>
          <Text style={[styles.col6, styles.tableRowText]}>{row.total_price}</Text>
        </View>
      ))}
    </View>
  )
}



export default InvoiceTable