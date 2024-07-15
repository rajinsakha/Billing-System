"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { productFormSchema } from "@/schemas/formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formProps } from "@/types/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { addProduct, updateProduct } from "@/api/products/product";
import { useToast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ISubCategoryDropdown } from "@/types/products";
import { setRefetch } from "@/redux/features/tableReducer";
import { useState } from "react";

export type ProductFormValues = z.infer<typeof productFormSchema>;

const ProductForm = ({ initialData }: formProps) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const title = initialData ? "Edit Product" : "New Product";
  const { singleData, categoryDropdown, subCategoryDropdown, refetch } =
    useAppSelector((state) => state.tableReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = initialData
    ? {
        name: initialData.name,
        quantity: initialData.stock,
        price: initialData.price,
        category: initialData.category?.value.toString(),
        sub_category: initialData.sub_category?.value.toString(),
      }
    : {
        name: "",
        quantity: null,
        price: null,
        category: "",
        sub_category: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const { watch } = form;

  const selectedCategory = watch("category");

  const filteredSubCategory: ISubCategoryDropdown[] =
    subCategoryDropdown.filter(
      (item) => item.category === Number(selectedCategory)
    );

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const transformedData = {
        name: data.name,
        price: data.price,
        in_stock: data.quantity,
        category: Number(data.category),
        sub_category: Number(data.sub_category),
        unit: data.unit
      };
      if (initialData) {
        const res = await updateProduct(singleData.id, transformedData);
        if (res.status === 200) {
          document.getElementById("closeDialog")?.click();
          dispatch(setRefetch(!refetch));
          toast({
            variant: "default",
            title: "Product Updated",
            description: `Product has been successfully updated`,
            duration: 3000
          });
        }
      } else {
        const res = await addProduct(transformedData);
        if (res.status === 201) {
          document.getElementById("closeDialog")?.click();
          dispatch(setRefetch(!refetch));
          toast({
            variant: "default",
            title: "New Product Added",
            description: `Product has been successfully added `,
            duration: 3000
          });
          console.log(res.data);
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
          <div className="h-[60vh] overflow-y-scroll hide-scrollbar space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select Category"
                          defaultValue={field.value?.toString()}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryDropdown.map((item, index) => (
                        <SelectItem key={index} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sub_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Sub Category"
                            defaultValue={field.value?.toString()}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredSubCategory.length === 0 ? (
                          <p className="p-1">No SubCategory Found</p>
                        ) : (
                          filteredSubCategory.map((item, index) => (
                            <SelectItem key={index} value={item.id.toString()}>
                              {item.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input  placeholder="Select Unit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default ProductForm;
