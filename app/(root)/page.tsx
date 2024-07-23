"use client"
import { DollarSign, Users } from "lucide-react";

import DynamicCard from "@/components/DashboardCard";
import RecentSales from "@/components/RecentSales";
import RecentTransactions from "@/components/RecentTransactions";
import useFetchDashboard from "@/lib/hooks/useFetchDashboard";

export default function Dashboard() {
  const {data} = useFetchDashboard();
  console.log(data);
  return (
    <div className="flex min-h-screen w-full flex-col mt-[40px]">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <DynamicCard
            title="Total Revenue"
            Icon={DollarSign}
            description="-"
            amount={data?.total_paid_amt || 0}
          />
          <DynamicCard
            title="Total Credits"
            Icon={Users}
            description="+180.1% from last month"
            amount={data?.total_credit_amt || 0}
          />
          <DynamicCard
            title="Total Sales"
            Icon={Users}
            description="+180.1% from last month"
            amount={data?.total_bill_price || 0}
          />
          <DynamicCard
            title="Total Products Sold"
            Icon={Users}
            description="+180.1% from last month"
            amount={data?.total_quantity_sold || 0}
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-5">
          <div className="col-span-1 xl:col-span-3 max-lg:overflow-x-scroll">
            <RecentTransactions />
          </div>

          <div className="col-span-1 xl:col-span-2">
            <RecentSales data={data?.products_sold?.slice(0,5)} />
          </div>
        </div>
      </main>
    </div>
  );
}
