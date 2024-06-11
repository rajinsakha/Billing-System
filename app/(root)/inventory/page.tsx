import ProductForm from '@/components/forms/ProductForm'
import { TableDataItem } from '@/types/table';
import React from 'react'

const Inventory = () => {

  const tableData: TableDataItem = {
    headers: ["Name","Category", "Price", "Stock Quantity", ""],
    data:[{
      id: 1,
      name: "Liam Johnson",
      status:"sale",
      date: "2023-06-23",
      amount: 2500
    }],
  };


  return (
    <div className='mt-[60px]'>
      <ProductForm initialData={null} />
    </div>
  )
}

export default Inventory