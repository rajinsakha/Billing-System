import { cache } from "react";
import api from "../axiosInstance";

 const revalidate = 3600;

export const getAllProducts = cache(async () => {
  const response = await api.get(`product/products/`);
  return response;
});

export const addProduct = cache(async (data: any) => {
  const response = await api.post(`product/products/`, data);
  return response;
});

export const updateProduct = cache(async (id:number, data: any) => {
  const response = await api.patch(`product/products/${id}/`, data);
  return response;
});

export const deleteProduct = cache(async (id:number) => {
  const response = await api.delete(`product/products/${id}/`);
  return response;
});

