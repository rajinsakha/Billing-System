import { cache } from "react";
import api from "../axiosInstance";

export const createTransactionBill = cache(async (data: any) => {
  try {
    const response = await api.post(`product/InvoiceBills/`, data);
    console.log("Add to Invoice response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Error adding to invoice:", error);
    throw error;
  }
});

export const deleteTransaction = cache(async (id: number) => {
    const response = await api.delete(`product/InvoiceBills/${id}/`);
    return response;
  });

export const getAllTransactions = cache(async (query="") => {
  const response = await api.get(`product/InvoiceBills/?customer_name=${query}`);
  return response;
});
