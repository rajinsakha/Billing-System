"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const TablePagination = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const {dynamicData} = useAppSelector((state)=>state.tableReducer);


  useEffect(() => {
      setCurrentPage(dynamicData.current_page);
  }, [dynamicData]);
  

  console.log(dynamicData);

  const handlePreviousClick = ()=>{}

  const handleNextClick = ()=>{}

  const handlePageClick = ()=>{}


  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {Array.from({length:dynamicData.total_pages}).map((_,i)=>(
    <PaginationItem key={i}>
    <PaginationLink isActive={currentPage === i+1 ? true : false} href="#">{i+1}</PaginationLink>
  </PaginationItem>
        ))}
    
      
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
