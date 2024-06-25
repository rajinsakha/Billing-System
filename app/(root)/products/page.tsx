"use client";

import TablePagination from "@/components/TablePagination";
import ProductCard from "@/components/ui/productCard";
import useFetchData from "@/lib/hooks/useFetchData";

import { useAppSelector } from "@/redux/hooks";

const ProductPage = () => {

  const {searchQuery, criteria} = useAppSelector((state)=>state.filterReducer)
  const { loading, error } = useFetchData("Product", searchQuery, criteria);
  const { dynamicTableData,  } = useAppSelector(
    (state) => state.tableReducer
  );

  return (
    <div className="mt-[60px] space-y-4">
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

      
      <TablePagination />
    </div>
  );
};

export default ProductPage;
