"use client";
import api from "@/api/axiosInstance";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  setDynamicData,
  setDynamicTableData,
} from "@/redux/features/tableReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const TablePagination = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { dynamicData } = useAppSelector((state) => state.tableReducer);

  useEffect(() => {
    setCurrentPage(dynamicData.current_page);
  }, [dynamicData]);

  console.log(dynamicData);

  const handlePreviousClick = async () => {
    if (dynamicData.previous !== null) {
      const res = await api.get(`${dynamicData.previous}`);
      if (res.status === 200) {
        dispatch(setDynamicData(res.data));
        dispatch(setDynamicTableData(res.data.results));
      }
    }
  };

  const handleNextClick = async () => {
    if (dynamicData.next !== null) {
      const res = await api.get(`${dynamicData.next}`);
      if (res.status === 200) {
        dispatch(setDynamicData(res.data));
        dispatch(setDynamicTableData(res.data.results));
      }
    }
  };

  const handlePageClick = async (pageNo: number) => {
    if (currentPage !== pageNo) {
      const res = await api.get(`/product/products/?page=${pageNo}`);
      if (res.status === 200) {
        dispatch(setDynamicData(res.data));
        dispatch(setDynamicTableData(res.data.results));
      }
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousClick}
            className={`${currentPage === 1 && "text-gray-200"} cursor-pointer`}
            style={{
              pointerEvents: dynamicData?.current_page === 1 ? "none" : "auto",
            }}
          />
        </PaginationItem>
        {Array.from({ length: dynamicData.total_pages }).map(
          (_, i) =>
            (i === 0 ||
              i === dynamicData.total_pages - 1 ||
              currentPage === i+1 ||
              i === currentPage || (currentPage === dynamicData.total_pages && i === dynamicData.total_pages - 2 )) && (
              <PaginationItem key={i}>
                <PaginationLink
                  className="cursor-pointer"
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageClick(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={handleNextClick}
            className={`${
              dynamicData?.next === null && "text-gray-200"
            } cursor-pointer`}
            style={{
              pointerEvents: dynamicData?.next === null ? "none" : "auto",
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
