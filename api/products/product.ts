import { cache } from "react";
import api from "../axiosInstance";

 const revalidate = 3600;

export const getAllProducts = cache(async (query="",category="", pageNo=1) => {
  const response = await api.get(`product/products/?search_name=${query}&category=${category}&page=${pageNo}`);
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

export const getProductPage = cache(async (pageNo:number) =>{
  const response = await api.get(`product/products/?page=${pageNo}`);
  return response;
})

