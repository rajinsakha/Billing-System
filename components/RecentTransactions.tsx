import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DynamicTable from "./DynamicTable";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TableDataItem } from "@/types/table";
import useFetchData from "@/lib/hooks/useFetchData";
import { useAppSelector } from "@/redux/hooks";

const RecentTransactions = () => {

  useFetchData("Transaction")

  const {dynamicTableData} = useAppSelector((state)=>state.tableReducer)
  const tableData: TableDataItem = {
    headers: ["Customer","Amount", "Mode of Payment", "Date",],
    data: dynamicTableData,
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center items-start gap-4">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="sm:ml-auto gap-1">
          <Link href="/transactions">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DynamicTable data={tableData.data} headers={tableData.headers} type="dashboardTransaction" />
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
