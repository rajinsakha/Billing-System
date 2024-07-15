"use client";
import { subCategoryFormSchema } from "@/schemas/formSchema";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setRefetch } from "@/redux/features/tableReducer";
import { formProps } from "@/types/form";
import {
  addSubCategory,
  updateSubCategory,
} from "@/api/products/dropdown/dropdown";
import { useParams } from "next/navigation";

export type SubCategoryFormValues = z.infer<typeof subCategoryFormSchema>;

const SubCategoryForm = ({ initialData }: formProps) => {
  const params = useParams();

  const dispatch = useAppDispatch();
const [isSubmitting, setIsSubmitting] = useState(false);
  const { categoryDropdown, refetch } = useAppSelector(
    (state) => state.tableReducer
  );


  const { toast } = useToast();

  const defaultValues = initialData
    ? {
        category: initialData?.category,
        name: initialData?.name,
      }
    : {
  
        name: "",
      };

  const form = useForm<SubCategoryFormValues>({
    resolver: zodResolver(subCategoryFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SubCategoryFormValues) => {
    setIsSubmitting(true);
    try {
      if (initialData) {
        const res = await updateSubCategory(initialData.id, data);
        if (res.status === 200) {
          document.getElementById("closeDialog")?.click();
          dispatch(setRefetch(!refetch));
          toast({
            variant: "default",
            title: "Sub-Category Updated",
            description: `Sub-Category has been successfully updated `,
          });
        }
      } else {
        const newData = {
          ...data,
          category: Number(params.id),
          
        }
        const res = await addSubCategory(newData);
        if (res.status === 201) {
          document.getElementById("closeDialog")?.click();
          dispatch(setRefetch(!refetch));
          toast({
            variant: "default",
            title: "New Sub-Category Added",
            description: `Sub-Category has been successfully added `,
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the sub category name"
                      {...field}
                    />
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

export default SubCategoryForm;
