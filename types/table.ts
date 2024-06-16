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
  data: IProduct[];
}
export interface TableProps {
  headers: string[];
  data: IProduct[] | any[];
  type: string;
}
