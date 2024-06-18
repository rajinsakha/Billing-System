import { cache } from "react";
import api from "../axiosInstance";
import { ProductFormValues } from "@/components/forms/ProductForm";
import { CategoryFormValues } from "@/components/forms/CategoryForm";

export const revalidate = 3600;

export const addCategory = cache(async (data: CategoryFormValues) => {
  const response = await api.post(`product/category/`, data);
  return response;
});

export const getCategory = cache(async () => {
  const response = await api.get(`product/category/`);
  return response;
});

export const addSubCategory = cache(async (data: any) => {
  const response = await api.post(`product/sub-category/`, data);
  return response;
});

export const getSubCategory = cache(async () => {
  const response = await api.get(`product/sub-category/`);
  return response;
});

export const getAllProducts = cache(async () => {
  const response = await api.get(`product/products/`);
  return response;
});

export const addProduct = cache(async (data: any) => {
  const response = await api.post(`product/products/`, data);
  return response;
});

export const updateProduct = cache(async (id:number, data: any) => {
  const response = await api.patch(`product/products/${id}`, data);
  return response;
});

export const deleteProduct = cache(async (id:number) => {
  const response = await api.delete(`product/products/${id}/`);
  return response;
});

export const addToInvoice = cache(async (data: any) => {
  try {
    const response = await api.post(`product/InvoiceItems/`, data);
    console.log("Add to Invoice response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Error adding to invoice:", error);
    throw error;
  }
});

export const updateInvoice = cache(async (id: number, data: any) => {
  const response = await api.patch(`product/InvoiceItems/${id}/`, data);
  return response;
});

export const getAllInvoices = cache(async () => {
  const response = await api.get(`product/InvoiceItems/`);
  return response;
});
