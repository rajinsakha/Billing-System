"use client";

import DynamicTable from "@/components/DynamicTable";
import AddModal from "@/components/modals/addModal";
import TitleText from "@/components/ui/titleText";
import useFetchData from "@/lib/hooks/useFetchData";

import { useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SubCategory = () => {

  const { loading, error } = useFetchData("SubCategory");
  const { dynamicTableData } = useAppSelector((state) => state.tableReducer);

  const tableData: TableDataItem = {
    headers: ["S.N.", "SubCategory Name"],
    data: dynamicTableData,
  };

  return (
    <div className="mt-[60px] space-y-4">
      <div className="flex gap-4 items-center justify-between pb-4">
        <div className="flex gap-6">
          <Link href="/category" className="p-2 bg-secondary rounded-full">
            <ArrowLeft />
          </Link>
          <TitleText title="Sub-Category" />
        </div>
        <AddModal type="SubCategory" />
      </div>

      <DynamicTable
        headers={tableData.headers}
        data={tableData.data}
        type="SubCategory"
      />
    </div>
  );
};

export default SubCategory;
