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

const RecentTransactions = () => {

  // const tableData: TableDataItem = {
  //   headers: ["Customer","Category", "Status", "Date", "Amount"],
  //   data:[{
  //     id: 1,
  //     category: "Pipe",
  //     name: "Liam Johnson",
  //     status:"sale",
  //     date: "2023-06-23",
  //     amount: 2500
  //   }],
  // };

  return (
    <Card x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {/* <DynamicTable data={tableData.data} headers={tableData.headers} type="transactions" /> */}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
