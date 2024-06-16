import {  addSubCategory } from '@/api/products/product'
import { subCategoryFormSchema } from '@/schemas/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


export type SubCategoryFormValues = z.infer<typeof subCategoryFormSchema>

const SubCategoryForm = () => {

const defaultValues = {
    category:'',
    sub_category: ''
}

const form = useForm<SubCategoryFormValues>({
    resolver: zodResolver(subCategoryFormSchema),
    defaultValues
})

const onSubmit = async (data:SubCategoryFormValues)=>{
try{
const res = await addSubCategory(data);
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
        <h1 className="text-2xl font-semibold">New Sub Category</h1>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pipes">Pipes</SelectItem>
                      <SelectItem value="Cement">Cement</SelectItem>
                      <SelectItem value="Taps">Taps</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sub_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the sub category name" {...field} />
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

export default SubCategoryForm