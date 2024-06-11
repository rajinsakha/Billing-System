export interface IProductCard {
  title: string;
  price: number;
  stock: number;
}

export interface IProduct {
  id: number;
  name: string;
  image: null;
  price: number;
  quantity: number;
  added_date: string;
  updated_date: string;
  empty_date: string;
  category: number;
  sub_category: number;
}
