import { addCategory } from '@/api/products/product'
import { categoryFormSchema } from '@/schemas/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


export type CategoryFormValues = z.infer<typeof categoryFormSchema>

const CategoryForm = () => {

const defaultValues = {
    category: ''
}

const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues
})

const onSubmit = async (data:CategoryFormValues)=>{
try{
const res = await addCategory(data);
if(res.status === 201){
    console.log(res.data);

}
}catch(error){
    console.log(error);
}
}

  return (
    <main className="">
      <div className="pb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">New Category</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="overflow-y-scroll hide-scrollbar space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  )
}

export default CategoryForm