import { IResult } from "@/types/table";

export const extractTableData = (data: any[] | IResult , type: string): any[] => {
    return data?.map((item) => {
      switch (type) {
        case "Product":
          return {
            id: item?.id,
            name: item?.name,
            price: item?.price,
            stock: item?.in_stock,
            category: item?.category,
            sub_category: item?.sub_category,
            added_date: item?.added_date,
          };
        case "Invoice":
          return {
            id: item?.id,
            name: item?.product_info?.label,
            quantity: {
              qty: item?.quantity,
              stock: item?.product_info?.in_stock,
              price: item?.product_info?.price,
            },
            total_price: item?.total_price,
            added_date: item?.created_at?.slice(0,10),
          };
        case "Category":
            return {
                id:item?.id,
                name:item?.name,
                total_subcategories:item?.total_subcategories
            };
        case "Transaction":
          return{
            id:item?.id,
            customer_name: item?.bill_for,
            total_price:"Rs " + item?.total_price,
            mode_of_payment: item?.mode_of_payment,
            paid_amt: "Rs " +  item?.paid_amt ,
            credit_amt:"Rs " +  item?.credit_amt,
            created_at:item?.created_at?.slice(0,10),
          
          }      
          case "SubCategory":
            return {
              id:item?.id,
              name:item?.name
            }
          case "dashboardTransaction":
            return{
              customer_name: item?.bill_for,
              total_price:"Rs " +  item?.total_price,
              mode_of_payment: item?.mode_of_payment || "-",
              created_at:item?.created_at?.slice(0,10),
            }   
        default:
          return item;
      }
    });
  };

  export function capitalizeFirstLetter(str:string) {
    return str.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }

