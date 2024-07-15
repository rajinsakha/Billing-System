import { IProduct } from "./products";
export interface IDynamicData {
  total_pages: number;
  count: number;
  next: null | string;
  previous: null | string;
  results: IResult;
  current_page: number;
}

export type IResult = IProduct[] | ITransaction[];
export interface TableDataItem {
  headers: string[];
  data: IProduct[] | any[];
}
export interface TableProps {
  headers: string[];
  data: IResult | any[];
  type: string;
}

export interface ITransaction {
  id: number;
  product_info: null | string;
  name: null | string;
  address: string;
  invoice_number: null | number;
  total_price: number;
  credit_amt: null | number;
  paid_amt: null | number;
  mode_of_payment: null | "cash" | "credit";
  created_at: string;
  updated_date: string;
  bill_for: string;
  is_printed: boolean;
  remark: null | string;
  Invoice_Item: any[];
  contact_no:null;
}

export interface ProductData {
  id: number;
  product_info: {
    value: number;
    label: string;
    price: number;
    in_stock: number;
  };
  quantity: number;
  total_price: number;
  created_at: string;
  discount: null | number | string;
  product: number;
  unit:string;
}
