"use client";
import DynamicTable from "@/components/DynamicTable";
import FilterDropdown from "@/components/filterDropdown";
import AddModal from "@/components/modals/addModal";
import TablePagination from "@/components/TablePagination";
import TitleText from "@/components/ui/titleText";
import useFetchData from "@/lib/hooks/useFetchData";
import useFetchDropdown from "@/lib/hooks/useFetchDropdown";
import { setCriteria } from "@/redux/features/filterReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import { useState } from "react";

const ImportTransaction = () => {
  const dispatch = useAppDispatch();
useFetchDropdown();
  const { searchQuery, criteria } = useAppSelector(
    (state) => state.filterReducer
  );
  const { loading, error } = useFetchData("Import", searchQuery, criteria);
  const { dynamicTableData, refetch } = useAppSelector(
    (state) => state.tableReducer
  );
  const [selectedPayment, setSelectedPayment] = useState<null | string>(null);

  const tableData: TableDataItem = {
    headers: [
      "S.N.",
      "Importer Name",
      "Total Price",
      "Mode of Payment",
      "Paid Amount",
      "Credit Amount",
      "Contact No.",
      "Added Date",
    ],
    data: dynamicTableData,
  };

  console.log(dynamicTableData);

  const handlePaymentChange = (value: string) => {
    setSelectedPayment(value);
    dispatch(
      setCriteria({
        mode_of_payment: value,
      })
    );
  };

  const paymentDropdown = [
    { id: "cash", name: "cash" },
    { id: "credit", name: "credit" },
  ];

  return (
    <div className="mt-[60px] space-y-6">
      <div className="flex gap-4 items-center justify-between max-sm:flex-col">
        <TitleText title="Import Transaction" />
        <div className="flex items-center gap-4 justify-end">
          <div className="flex items-center gap-2">
            <p>Filter By:</p>
            <FilterDropdown
              placeholder="Mode of Payment"
              width="w-[200px]"
              options={paymentDropdown}
              handleChange={handlePaymentChange}
            />
          </div>
          <AddModal type="Import" />
        </div>
      </div>

      <DynamicTable
        headers={tableData.headers}
        data={tableData.data}
        type="Import"
      />

      <TablePagination type="Import" />
    </div>
  );
};

export default ImportTransaction;
