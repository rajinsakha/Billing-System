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
import { extractTableData } from "@/lib/tableFunction";
import { useRouter } from "next/navigation";
import { setCategory } from "@/redux/features/authReducer";

const DynamicTable = ({ headers, data, type }: TableProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const extractedData = extractTableData(data, type);

  const handleClick = (id: number, name?: string) => {
    if (type === "Category") {
      dispatch(setCategory(name));
      router.push(`/category/${id}/`);
    }
  };

  return (
    <ScrollArea
      className={`${
        type === "Invoice"
          ? "h-[52vh]"
          : type === "dashboardTransaction"
          ? "h-[320px]"
          : "h-[65vh]"
      } w-full`}
    >
      <Table className="max-lg:overflow-x-scroll relative">
        <TableHeader className="sticky top-0 z-[10] mb-10 bg-white">
          <TableRow className="bg-[#F2F2F2]">
            {headers.map((head, index) => (
              <TableHead
                key={index}
                className={`${
                  head === "Quantity" && "flex justify-center items-center"
                }`}
              >
                {head}
              </TableHead>
            ))}
            {type !== "dashboardTransaction" && <TableHead></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody className="w-full !overflow-scroll">
          {extractedData?.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={`${
                type === "Category" && "cursor-pointer"
              } text-[#484848]`}
            >
              {Object.entries(row).map(([key, value]: any, colIndex) => (
                <React.Fragment key={colIndex}>
                  {key === "quantity" ? (
                    <TableCell>
                      <QuantityForm initialData={row} />
                    </TableCell>
                  ) : typeof value === "object" &&
                    value?.hasOwnProperty("label") &&
                    value?.hasOwnProperty("value") ? (
                    <TableCell>{value.label}</TableCell>
                  ) : type === "Invoice" && key === "id" ? (
                    <TableCell>{rowIndex + 1}</TableCell>
                  ) : (
                    <TableCell
                      key={colIndex}
                      onClick={() => handleClick(row?.id, row?.name)}
                    >
                      <div className="font-medium">{value}</div>
                    </TableCell>
                  )}
                </React.Fragment>
              ))}
              {type !== "dashboardTransaction" && (
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
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default DynamicTable;
