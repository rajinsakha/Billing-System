import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const RecentSales = ({ data }: any) => {
  return (
    <Card x-chunk="dashboard-01-chunk-5" className="h-[429px]">
      <CardHeader>
        <CardTitle>Highest Sales</CardTitle>
        <CardDescription>Top Products from your store.</CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F2F2F2] hover:bg-[#F2F2F2]">
              <TableHead>Product Name</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="!py-4">{row.product__name}</TableCell>
                <TableCell className="!py-4 text-center font-medium">
                  {row.total_sold}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentSales;
