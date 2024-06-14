"use client";
import { getAllProducts } from "@/api/products/product";
import ProductCard from "@/components/ui/productCard";
import {
  setDynamicData,
  setDynamicTableData,
} from "@/redux/features/tableReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useCallback, useEffect, } from "react";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { dynamicTableData } = useAppSelector((state) => state.tableReducer);

  const getData = useCallback(async () => {
    try {
      const res = await getAllProducts();
      if (res.status === 200) {
        dispatch(setDynamicData(res.data));
        dispatch(setDynamicTableData(res.data?.results));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="mt-[60px]">
      <div className="grid grid-cols-3 gap-8">
        {dynamicTableData.map((data) => (
          <ProductCard
            key={data.id}
            title={data.name}
            price={data.price}
            stock={14}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
