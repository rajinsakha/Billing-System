"use client";

import ProductCard from "@/components/ui/productCard";
import useFetchData from "@/lib/hooks/useFetchData";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const ProductPage = () => {

  const { loading, error } = useFetchData("Product");
  const { dynamicTableData, refetch } = useAppSelector(
    (state) => state.tableReducer
  );

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
