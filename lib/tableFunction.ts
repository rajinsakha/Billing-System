import { IResult } from "@/types/table";
import { formatNumber } from "./calculation";

export const extractTableData = (
  data: any[] | IResult,
  type: string
): any[] => {
  return data?.map((item) => {
    switch (type) {
      case "Product":
        return {
          id: item?.id,
          name: item?.name,
          price:item?.price,
          stock: item?.in_stock,
          category: item?.category,
          sub_category: item?.sub_category,
          unit: item?.unit,
          added_date: item?.added_date,
        };
      case "Invoice":
        return {
          id: item?.id,
          name: item?.product_info?.label,
          price: formatNumber(item?.product_info?.price),
          quantity: {
            qty: item?.quantity,
            stock: item?.product_info?.in_stock,
            price: item?.product_info?.price,
          },
          total_price: formatNumber(item?.total_price),
          added_date: item?.created_at?.slice(0, 10),
        };
      case "Category":
        return {
          id: item?.id,
          name: item?.name,
          total_subcategories: item?.total_subcategories,
        };
      case "Transaction":
        return {
          id: item?.id,
          customer_name: item?.bill_for,
          total_price: formatNumber(item?.total_price),
          mode_of_payment: capitalizeFirstLetter(item?.mode_of_payment),
          paid_amt: formatNumber(item?.paid_amt),
          credit_amt: formatNumber(item?.credit_amt) ,
          contact_no: item?.contact_no,
          created_at: item?.invoice_miti,
        };
      case "SubCategory":
        return {
          id: item?.id,
          name: item?.name,
        };
      case "dashboardTransaction":
        return {
          customer_name: item?.bill_for,
          total_price: formatNumber(item?.total_price),
          mode_of_payment: capitalizeFirstLetter(item?.mode_of_payment) ,
          invoice_miti: item?.invoice_miti,
        };
      case "Import":
        return{
          id: item?.id,
         importer_name: item?.name,
          total_price: formatNumber(item?.total_price),
          mode_of_payment: capitalizeFirstLetter(item?.mode_of_payment),
          paid_amt: formatNumber(item?.paid_amt),
          credit_amt: formatNumber(item?.credit_amt) ,
          contact_no: item?.contact_no,
          created_at: item?.invoice_miti,
        }  
      default:
        return item;
    }
  });
};

export function capitalizeFirstLetter(str: string) {
  return str
    ?.split(" ")
    ?.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
