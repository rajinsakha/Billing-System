
import { categoryFormSchema } from "@/schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setRefetch } from "@/redux/features/tableReducer";
import { formProps } from "@/types/form";
import { addCategory, updateCategory } from "@/api/products/dropdown/dropdown";

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

const CategoryForm = ({initialData}:formProps) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const title = initialData ? "Edit Category" : "New Category";
  const {refetch} = useAppSelector((state)=>state.tableReducer)

  const defaultValues = initialData?{
    name: initialData.name
  } :{
    name: "",
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    try {
      if(initialData){
        const res = await updateCategory(initialData.id, data);
        if(res.status === 200){
          document.getElementById("closeDialog")?.click();
          dispatch(setRefetch(!refetch));
          toast({
            variant: "default",
            title: "Category Updated",
            description: `Category has been successfully updated`,
          });
        }
      }else{

      const res = await addCategory(data);
      if (res.status === 201) {
        document.getElementById("closeDialog")?.click();
        dispatch(setRefetch(!refetch));
        toast({
          variant: "default",
          title: "New Category Added",
          description: `Category has been successfully added `,
        });
      }
    }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Occured",
        description: `Error Occured: ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="">
      <div className="pb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="overflow-y-scroll hide-scrollbar space-y-6">
            <FormField
              control={form.control}
              name="name"
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

          <Button type="submit" disabled={isSubmitting}>Submit</Button>
        </form>
      </Form>
    </main>
  );
};

export default CategoryForm;
