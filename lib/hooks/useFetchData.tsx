
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setDynamicData,
  setDynamicTableData,
} from "@/redux/features/tableReducer";
import {  getAllProducts } from "@/api/products/product";
import { getAllInvoices } from "@/api/invoices/invoice";
import { getAllCategories, getAllSubCategories,  } from "@/api/products/dropdown/dropdown";
import { getAllTransactions } from "@/api/invoices/transaction";

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

      if(type === "Category"){
        response = await getAllCategories();
      }

      if(type === "SubCategory"){
        response = await getAllSubCategories();
      }

      if(type === "Transaction"){
        response = await getAllTransactions();
      }

      if (response?.status === 200) {
        if(type === "Invoice"){
          dispatch(setDynamicTableData(response.data))
        }else{
          dispatch(setDynamicData(response?.data));
          dispatch(setDynamicTableData(response.data?.results));
        }
   
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
