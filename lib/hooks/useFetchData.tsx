
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setDynamicData,
  setDynamicTableData,
} from "@/redux/features/tableReducer";
import {  getAllProducts } from "@/api/products/product";
import { getAllInvoices } from "@/api/invoices/invoice";

const useFetchData = (type: string) => {
  const dispatch = useAppDispatch();
  const { refetch } = useAppSelector((state) => state.tableReducer);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (type === "Product" || type === "Inventory") {
        response = await getAllProducts();
      }

      if (type === "Invoice") {
        response = await getAllInvoices();
      }

      if (response?.status === 200) {
        dispatch(setDynamicData(response?.data));
        dispatch(setDynamicTableData(response.data?.results));
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refetch]);

  return { loading, error };
};

export default useFetchData;
