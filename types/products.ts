export interface IProductCard {
  id:number;
  title: string;
  price: number;
  stock: number;
}

export interface IProduct {
  id: number;
  name: string;
  image: null;
  price: number;
  in_stock: number;
  added_date: string;
  updated_date: string;
  empty_date: string;
  category: {
    label:string;
    value:number;
  };
  sub_category: {
    label:string;
    value:number;
  };
}

export interface ICategoryDropdown{
  id:number;
  name:string;
}

export interface ISubCategoryDropdown{
  id:number;
  name:string;
  category:number;
}


export interface InvoiceData{
  address:string;
  contact_number: number;
  bill_for: string,
  is_printed: boolean,
  total_price: number,
  Invoice_Item: number[],
  discount: number;
  price_before_discount:number;
  payment:string;
  remarks?:string;
}


