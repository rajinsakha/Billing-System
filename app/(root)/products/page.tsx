"use client"
import { getAllProducts } from '@/api/products/product'
import ProductCard from '@/components/ui/productCard'
import React, { useCallback, useEffect } from 'react'

const ProductPage = () => {

  const getData = useCallback(async()=>{
    try{
      const res = await getAllProducts();
      if(res.status === 200){
        console.log(res.data);
      }

    }catch(error){
      console.log(error);
    }
  },[])

  useEffect(()=>{
    getData()
  },[getData])



  return (
    <div className='mt-[60px]'>
      {/* <ProductForm initialData={null} /> */}
      <div className='grid grid-cols-3 gap-8'>
      <ProductCard title='PPC PIPE' price={500} stock={14} />
     
      </div>
     
    
    </div>
  )
}

export default ProductPage