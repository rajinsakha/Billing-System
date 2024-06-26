"use client";

import { IProductCard } from "@/types/products";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,

} from "../ui/form";
import { Button } from "./button";
import { genericSchema, singleProductFormSchema } from "@/schemas/formSchema";

import { Minus, Plus } from "lucide-react";
import { addToInvoice, updateInvoice } from "@/api/invoices/invoice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setRefetch } from "@/redux/features/tableReducer";
import { useToast } from "./use-toast";
import { useEffect, useState } from "react";

// Define the type based on the schema
export type SingleProductFormValues = z.infer<typeof genericSchema>;

const ProductCard = ({ id, title, price, stock }: IProductCard) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { invoiceData, refetch } = useAppSelector(
    (state) => state.tableReducer
  );

  const form = useForm<SingleProductFormValues>({
    resolver: zodResolver(singleProductFormSchema(stock)),
    defaultValues: {
      name: title,
      price: price,
      quantity: 1,
    },
  });

  useEffect(() => {
    if (form.formState.errors.quantity) {
      toast({
        title: "Invalid Quantity",
        description: form.formState.errors.quantity.message,
        variant: "destructive",
      });
    }
  }, [form.formState.errors, toast]);


  const onSubmit = async (data: SingleProductFormValues) => {
    setIsSubmitting(true);
    try {
      const productID = invoiceData.find((item) => item.product === id);
      if (productID) {
        let newQuantity = productID.quantity + data.quantity;
        let newData = {
          quantity: newQuantity,
          total_price: data.price * newQuantity,
        };
        const res = await updateInvoice(productID.id, newData);
        if (res.status === 200) {
          console.log(res.data);
        }
      } else {
        let newData = {
          ...data,
          product: id,
          total_price: data.price * data.quantity,
        };

        const res = await addToInvoice(newData);

        if (res?.status === 201) {
          console.log(res.data);
          dispatch(setRefetch(!refetch));
          toast({
            variant: "default",
            title: "Product Added Successfully",
            description: `${data.name} has been added to invoice.`,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Failed to Add Product",
        description: `Error Occured: ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col  shadow-md rounded-md h-[300px] justify-between py-4 px-6 border">
          <div>
            <h1 className="text-lg h-[45px]">
              {title?.length > 50 ? title?.slice(0, 50) + "..." : title}
            </h1>
          </div>
          <div className="space-y-1">
            <p className="text-[13.4px]">
              <span className="font-semibold text-sm">{stock} </span> Stocks
              Remaining{" "}
            </p>
          </div>
          <div className="flex flex-col gap-4 ">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="relative flex flex-col justify-center items-center gap-2">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center w-[8rem] justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(Math.max(field.value - 1, 1))
                        }
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300  p-3 h-11 focus:ring-gray-1 focus:ring-2 focus:outline-none"
                      >
                        <Minus className="w-3 h-3 text-gray-900" />
                      </button>
                      <input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm  block w-full py-2.5"
                        placeholder="1"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(Math.min(field.value + 1, stock))
                        }
                        className="bg-gray-100  hover:bg-gray-200 border border-gray-300  p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
                      >
                        <Plus className="w-3 h-3 text-gray-900" />
                      </button>
                    </div>
                  </FormControl>
               
                </FormItem>
              )}
            />

            <p className="text-xl font-semibold text-orange-600">Rs {price}</p>
            <Button type="submit" disabled={isSubmitting || stock === 0}>
              Add to Invoice
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductCard;
