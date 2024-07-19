"use client";

import { getAllInvoices } from "@/api/invoices/invoice";
import FilterDropdown from "@/components/filterDropdown";
import TablePagination from "@/components/TablePagination";
import ProductCard from "@/components/ui/productCard";
import TitleText from "@/components/ui/titleText";
import useFetchData from "@/lib/hooks/useFetchData";
import useFetchDropdown from "@/lib/hooks/useFetchDropdown";
import { setCriteria } from "@/redux/features/filterReducer";
import { setInvoiceData } from "@/redux/features/tableReducer";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useCallback, useEffect, useState } from "react";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, criteria } = useAppSelector(
    (state) => state.filterReducer
  );
  const { pageNo } = useAppSelector((state) => state.authReducer);
  const { loading, error } = useFetchData(
    "Product",
    searchQuery,
    criteria,
    pageNo
  );
  const { dynamicTableData, refetch, categoryDropdown } = useAppSelector(
    (state) => state.tableReducer
  );
  useFetchDropdown();
  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);

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

  const handleCategoryChange = (value: string) => {
    const categoryId = Number(value);
    setSelectedCategory(categoryId);
    dispatch(
      setCriteria({
        category: categoryId,
      })
    );
  };

  useEffect(()=>{
    dispatch(setCriteria({}))
  },[dispatch])

  return (
    <main className="mt-[60px] space-y-4 flex flex-col min-h-[85vh]">
      <div className="flex gap-4 items-center justify-between max-sm:flex-col">
      <TitleText title="Products" />
      <div className="flex items-center gap-2 justify-end">
        <p>Filter By:</p>
        <FilterDropdown
          placeholder="Category"
          width="w-[200px]"
          options={categoryDropdown}
          handleChange={handleCategoryChange}
        />
      </div>
      </div>
  
      {dynamicTableData.length === 0 ? (
        <div className="flex items-center justify-center text-xl h-[75vh]">
          No Products Available
        </div>
      ) : (
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

      {dynamicTableData.length !== 0 && (
        <div className="mt-auto">
          <TablePagination type="Product" />
        </div>
      )}
    </main>
  );
};

export default ProductPage;
