import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableProps } from "@/types/table";
import { ScrollArea } from "./ui/scroll-area";
import React from "react";
import { SingleProductFormValues } from "./ui/productCard";
import { useForm } from "react-hook-form";
import { singleProductFormSchema } from "@/schemas/formSchema";



const DynamicTable = ({ headers, data, type }: TableProps) => {
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



  if (type === "products") {
    data?.forEach((item) => {
      const extractedItem: any = {
        id: item?.id,
        name: item?.name,
        price: item?.price,
        stock:item?.in_stock,
        category: item?.category?.label,
        sub_category: item?.sub_category?.label,
        added_date: item?.added_date,
      };
      extractedData.push(extractedItem);
    });
  }

  if (type === "invoices") {
    data?.forEach((item) => {
      const extractedItem: any = {
        id: item?.id,
        name: item?.product_info?.label,
        quantity: item?.quantity,
        total_price: item?.total_price,
        // category: item?.category?.label,
        // sub_category:item?.sub_category?.label,
        added_date: item?.created_at,
      };
      extractedData.push(extractedItem);
    });
  }

  return (
    <ScrollArea className="h-[65vh]">
      <Table className="">
        <TableHeader>
          <TableRow>
            {headers.map((head, index) => (
              <TableHead key={index}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {extractedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.entries(row).map(([key, value]: any, colIndex) => (
                <React.Fragment key={colIndex}>
                  {key === "quantity" ? (
                    <TableCell>{value}</TableCell>
                  ) : (
                    <TableCell key={colIndex}>
                      <div className="font-medium">{value}</div>
                    </TableCell>
                  )}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default DynamicTable;
