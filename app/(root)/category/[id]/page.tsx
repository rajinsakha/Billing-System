"use client";

import DynamicTable from "@/components/DynamicTable";
import TablePagination from "@/components/TablePagination";
import AddModal from "@/components/modals/addModal";
import TitleText from "@/components/ui/titleText";
import useFetchData from "@/lib/hooks/useFetchData";
import useFetchDropdown from "@/lib/hooks/useFetchDropdown";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TableDataItem } from "@/types/table";


const SubCategory = () => {
  const dispatch = useAppDispatch();
  const {loading, error} = useFetchData("SubCategory")
  const { dynamicTableData } = useAppSelector((state) => state.tableReducer);

  const tableData: TableDataItem = {
    headers: [
      "S.N.",
      "SubCategory Name",
      "Added Date",
    ],
    data: [],
  };

  return (
    <div className="mt-[60px] space-y-4">
      <div className="flex gap-4 items-center justify-between pb-4">
       <TitleText title="Sub-Category" /> 
      <AddModal type="SubCategory"/>
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
