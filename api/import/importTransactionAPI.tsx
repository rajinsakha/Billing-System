import { cache } from "react";
import api from "../axiosInstance";

export const getAllImports = cache(
  async (query = "", category = "", pageNo = 1) => {
    const response = await api.get(
      `product/ImportProducts/?search_name=${query}&category=${category}&page=${pageNo}`
    );
    return response;
  }
);

export const addImport = cache(async (data: any) => {
  const response = await api.post(`product/ImportProducts/`, data);
  return response;
});

export const updateImport = cache(async (id: number, data: any) => {
  const response = await api.patch(`product/ImportProducts/${id}/`, data);
  return response;
});

export const deleteImport = cache(async (id: number) => {
  const response = await api.delete(`product/ImportProducts/${id}/`);
  return response;
});

export const getImportPage = cache(async (pageNo: number) => {
  const response = await api.get(`product/ImportProducts/?page=${pageNo}`);
  return response;
});
