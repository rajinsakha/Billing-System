import { singleInvoiceSchema } from '@/schemas/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const genericSchema = z.object({
    quantity:z.number()
})

type SingleInvoiceValues = z.infer<typeof genericSchema>;

const SingleInvoiceForm = ({stock, quantity}:{stock:number, quantity:number}) => {

   
    
  const form = useForm<SingleInvoiceValues>({
    resolver: zodResolver(singleInvoiceSchema(stock)),
    defaultValues: {
      quantity: quantity,
    },
  });


  return (
    <div>



    </div>
  )
}

export default SingleInvoiceForm