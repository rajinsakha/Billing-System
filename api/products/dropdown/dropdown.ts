import api from "@/api/axiosInstance";
import { CategoryFormValues } from "@/components/forms/CategoryForm";
import { cache } from "react";

export const addCategory = cache(async (data: CategoryFormValues) => {
  const response = await api.post(`product/category/`, data);
  return response;
});

export const updateCategory = cache(async (id:number, data: CategoryFormValues) => {
  const response = await api.patch(`product/category/${id}`, data);
  return response;
});

export const getAllCategories = cache(async () => {
  const response = await api.get(`product/allCategory/`);
  return response;
});

export const getCategoryDropdown = cache(async () => {
  const response = await api.get(`product/category/`);
  return response;
});

export const deleteCategory = cache(async (id:number) => {
    const response = await api.delete(`product/category/${id}`);
    return response;
  });

export const addSubCategory = cache(async (data: any) => {
  const response = await api.post(`product/sub-category/`, data);
  return response;
});

export const updateSubCategory = cache(async (id:number,data: any) => {
    const response = await api.post(`product/sub-category/${id}`, data);
    return response;
  });

export const getAllSubCategories = cache(async () => {
    const response = await api.get(`product/allSubCategory/`);
    return response;
  });
  
export const getSubCategoryDropdown = cache(async () => {
  const response = await api.get(`product/sub-category/`);
  return response;
});

export const deleteSubCategory = cache(async (id:number,data: any) => {
    const response = await api.delete(`product/sub-category/${id}`);
    return response;
  });
  
