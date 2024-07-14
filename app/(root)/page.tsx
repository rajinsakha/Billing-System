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
            amount={45231.89}
          />
          <DynamicCard
            title="Subscriptions"
            Icon={Users}
            description="+180.1% from last month"
            amount={45231.89}
          />
          <DynamicCard
            title="Subscriptions"
            Icon={Users}
            description="+180.1% from last month"
            amount={45231.89}
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-5">
          <div className="col-span-1 xl:col-span-3">
            <RecentTransactions />
          </div>

          <div className="col-span-1 xl:col-span-2">
            <RecentSales />
          </div>
        </div>
      </main>
    </div>
  );
}
