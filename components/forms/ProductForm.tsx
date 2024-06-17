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
import { addProduct } from "@/api/products/product";
import { useToast } from "../ui/use-toast";
import { useAppSelector } from "@/redux/hooks";
import { ISubCategoryDropdown } from "@/types/products";

export type ProductFormValues = z.infer<typeof productFormSchema>;

const ProductForm = ({ initialData }: formProps) => {
  const { toast } = useToast();
  const title = initialData ? "Edit Product" : "New Product";
  const { categoryDropdown, subCategoryDropdown } = useAppSelector(
    (state) => state.tableReducer
  );

  const defaultValues = initialData
    ? {
        name: initialData.username,
      }
    : {
        name: "",
        quantity: 0,
        price: 0,
        category: "",
        sub_category: "",
      };

  // const filteredSubCategory: ISubCategoryDropdown[] =
  //   subCategoryDropdown.filter(
  //     (item) => item.name === defaultValues.category
  //   );

  //   console.log(filteredSubCategory);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (initialData) {
      } else {
        const res = await addProduct(data);
        if (res.status === 201) {
          document.getElementById("closeDialog")?.click();
          toast({
            variant: "default",
            title: "New Product Added",
            description: `PRoduct has been successfully added `,
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                      <Input type="number" placeholder="shadcn" {...field} />
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
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
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

            <FormField
              control={form.control}
              name="sub_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subCategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subCategoryDropdown.map((item, index) => (
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
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
};

export default ProductForm;
