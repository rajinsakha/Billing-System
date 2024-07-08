import { cache } from "react";
import api from "../axiosInstance";

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

export const deleteInvoice = cache(async (id: number) => {
    const response = await api.delete(`product/InvoiceItems/${id}/`);
    return response;
  });

export const getAllInvoices = cache(async () => {
  const response = await api.get(`product/InvoiceItems/`);
  return response;
});


