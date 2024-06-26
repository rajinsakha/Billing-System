"use client"
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
import { useParams } from "next/navigation";

interface Criteria {
  [key: string]: string;
}

const useFetchData = (type: string, searchQuery?:string, criteria?:Criteria) => {
  const params = useParams();
 const id = Number(params.id);
  const dispatch = useAppDispatch();
  const { refetch, singleData } = useAppSelector((state) => state.tableReducer);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

console.log(singleData);
  

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (type === "Product" || type === "Inventory") {
        response = await getAllProducts(searchQuery, criteria?.category);
      }

      if (type === "Invoice") {
        response = await getAllInvoices();
      }

      if(type === "Category"){
        response = await getAllCategories();
      }

      if(type === "SubCategory"){
        response = await getAllSubCategories(id);
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
  }, [dispatch, id, type,searchQuery,criteria]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refetch]);

  return { loading, error };
};

export default useFetchData;
