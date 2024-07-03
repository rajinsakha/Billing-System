"use client";

import { getAllInvoices } from "@/api/invoices/invoice";
import TablePagination from "@/components/TablePagination";
import Loader from "@/components/ui/loader";
import ProductCard from "@/components/ui/productCard";
import useFetchData from "@/lib/hooks/useFetchData";
import { setInvoiceData } from "@/redux/features/tableReducer";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCallback, useEffect } from "react";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, criteria } = useAppSelector(
    (state) => state.filterReducer
  );
  const { loading, error } = useFetchData("Product", searchQuery, criteria);
  const { dynamicTableData, refetch } = useAppSelector(
    (state) => state.tableReducer
  );

  const getInvoiceData = useCallback(async () => {
    try {
      const res = await getAllInvoices();
      if (res.status === 200) {
        dispatch(setInvoiceData(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getInvoiceData();
  }, [getInvoiceData, refetch]);

  return (
    <div className="mt-[60px] space-y-4">
      {dynamicTableData.length === 0 ? (
        <div className="flex items-center justify-center text-xl h-[75vh]">
          No Products Available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dynamicTableData?.map((data) => (
            <ProductCard
              key={data.id}
              id={data.id}
              title={data.name}
              price={data.price}
              stock={data.in_stock}
            />
          ))}
        </div>
      )}

      {dynamicTableData.length !== 0 && <TablePagination />}
    </div>
  );
};

export default ProductPage;
