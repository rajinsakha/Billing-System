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
import QuantityForm from "./forms/QuantityForm";
import DeleteModal from "./modals/deleteModal";
import { extractTableData } from "@/lib/table";
import { useRouter } from "next/navigation";

const DynamicTable = ({ headers, data, type }: TableProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const extractedData = extractTableData(data, type);

  const handleClick = (id:number) =>{
    // console.log(id);
    if(type === "Category"){
      router.push(`/category/${id}/`);
    }
  }

  return (
    <ScrollArea className="h-[60vh]">
      <Table className="">
        <TableHeader>
          <TableRow>
            {headers.map((head, index) => (
              <TableHead key={index} className={`${head === "Quantity" && "flex justify-center items-center" }`}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {extractedData?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.entries(row).map(([key, value]: any, colIndex) => (
                <React.Fragment key={colIndex}>
                  {key === "quantity" ? (
                    <TableCell>
                      <QuantityForm initialData={row} />
                    </TableCell>
                  ) : (
                    <TableCell key={colIndex} onClick={()=>handleClick(row?.id)}>
                      <div className="font-medium">{value}</div>
                    </TableCell>
                  )}
                </React.Fragment>
              ))}
              <TableCell
              className="w-[100px] text-right"
                onClick={() => {
                  dispatch(setSingleData(row));
                  dispatch(setType(type));
                }}
              >
                {type !== "Invoice" ? (
                  <ToggleDropdown />
                ) : (
                  <DeleteModal isSeparate />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default DynamicTable;
