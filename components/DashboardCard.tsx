import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardCardProps } from "@/types/dashboard";
import { formatNumber } from "@/lib/calculation";

const DashboardCard = ({
  title,
  amount,
  description,
  Icon,
  moneyType
}: DashboardCardProps) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {moneyType  && "Rs"} {formatNumber(amount)}
        </div>
        {/* <p className="text-xs text-muted-foreground">{description}</p> */}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
