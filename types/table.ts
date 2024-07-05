import { IProduct } from "./products";
export interface IDynamicData {
  total_pages: number;
  count: number;
  next: null | string;
  previous: null | string;
  results: IProduct[];
  current_page: number;
}
export interface TableDataItem {
  headers: string[];
  data: IProduct[] | any[];
}
export interface TableProps {
  headers: string[];
  data: IProduct[] | any[];
  type: string;
}

export interface ProductData {
  id: number;
  product_info: {
    value: number;
    label: string;
    price: number;
    in_stock: number;
  }
  quantity: number;
  total_price: number;
  created_at: string;
  discount: null | number | string;
  product: number;
}
