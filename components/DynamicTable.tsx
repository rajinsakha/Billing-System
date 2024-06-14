import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableDataItem, TableProps } from "@/types/table";

const DynamicTable = ({ headers, data,type }: TableProps) => {

  let extractedData: any[] = [];

  // if(type === "transactions"){
  //   data?.forEach((item) => {
  //     const extractedItem: any = {
  //       customer: item?.name,
  //       category: item?.category,
  //       status: item?.status,
  //       created_date: item?.date,
  //       amount: item?.amount
  //     };
  //     extractedData.push(extractedItem);
  //   });
  // }

  if(type === "products"){
    data?.forEach((item)=>{
      const extractedItem: any = {
        id: item?.id,
        name: item?.name,
        price: item?.price,
        category: item?.category?.label,
        sub_category:item?.sub_category?.label,
        added_date:item?.added_date,
      };
      extractedData.push(extractedItem);
    })
  }


  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((head, index) => (
            <TableHead key={index}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {extractedData.map((row,rowIndex) => (
          <TableRow key={rowIndex}>
            {Object.entries(row).map(([key, value]: any, colIndex) => (
              <TableCell key={colIndex}>
                <div className="font-medium">{value}</div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DynamicTable;
