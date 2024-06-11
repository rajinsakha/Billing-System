import { cache } from "react";
import api from "../axiosInstance";
import { ProductFormValues } from "@/components/forms/ProductForm";

export const revalidate = 3600;

export const getAllProducts = cache(async () => {
  const response = await api.get(`product/products/`);
  return response;
});


export const addProduct = cache(async(data:ProductFormValues)=>{
    const response = await api.post(`product/`, data);
    return response;
})