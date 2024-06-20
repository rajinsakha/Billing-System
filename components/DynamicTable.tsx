"use client";
import React from "react";
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
import ToggleDropdown from "./toggleDropdown";
import { useAppDispatch } from "@/redux/hooks";
import { setSingleData, setType } from "@/redux/features/tableReducer";

const DynamicTable = ({ headers, data, type }: TableProps) => {
  const dispatch = useAppDispatch();
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

  if (type === "Product") {
    data?.forEach((item) => {
      const extractedItem: any = {
        id: item?.id,
        name: item?.name,
        price: item?.price,
        stock: item?.in_stock,
        category: item?.category?.label,
        sub_category: item?.sub_category?.label,
        added_date: item?.added_date,
      };
      extractedData.push(extractedItem);
    });
  }

  if (type === "Invoice") {
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
    <ScrollArea className="h-[60vh]">
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
              <TableCell
                onClick={() => {
                  dispatch(setSingleData(row));
                  dispatch(setType(type));
                }}
              >
                <ToggleDropdown />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default DynamicTable;
