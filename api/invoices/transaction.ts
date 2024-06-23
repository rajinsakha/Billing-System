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

// export const updateInvoice = cache(async (id: number, data: any) => {
//   const response = await api.patch(`product/InvoiceBills/${id}/`, data);
//   return response;
// });

export const deleteTransaction = cache(async (id: number) => {
    const response = await api.delete(`product/InvoiceBills/${id}/`);
    return response;
  });

export const getAllTransactions = cache(async () => {
  const response = await api.get(`product/InvoiceBills/`);
  return response;
});