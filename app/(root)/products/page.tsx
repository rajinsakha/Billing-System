"use client";
import { getAllInvoices, getAllProducts, getCategory } from "@/api/products/product";
import ProductCard from "@/components/ui/productCard";
import {
  setDynamicData,
  setDynamicTableData,
  setInvoiceData,
} from "@/redux/features/tableReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useCallback, useEffect, } from "react";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { dynamicTableData, refetch } = useAppSelector((state) => state.tableReducer);
  
  const getData = useCallback(async () => {
    try {
      const res = await getAllProducts();

    
      if (res.status === 200) {
        dispatch(setDynamicData(res.data));
        dispatch(setDynamicTableData(res.data?.results));
      }

    

      const invoiceRes = await getAllInvoices();
      if (invoiceRes.status === 200) {
        dispatch(setInvoiceData(invoiceRes.data.results));
      }

    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData,refetch]);

  return (
    <div className="mt-[60px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dynamicTableData.map((data) => (
          <ProductCard
            key={data.id}
            id={data.id}
            title={data.name}
            price={data.price}
            stock={data.in_stock}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
