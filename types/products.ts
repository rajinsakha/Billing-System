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


