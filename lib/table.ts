export const extractTableData = (data: any[], type: string): any[] => {
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
            added_date: item?.created_at,
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
            total_price:item?.total_price,
            created_at:item?.created_at,
          }      
          case "SubCategory":
            return {
              id:item?.id,
              name:item?.name
            }
        default:
          return item;
      }
    });
  };

  export const generateHeight = (type:string)=>{
    if(type === "Invoice"){
      return "h-[55vh]"
    }else{
      return "h-[65vh]"
    }
  }