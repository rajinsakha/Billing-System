"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  FormMessage,
} from "../ui/form";
// import { Button } from "./button";
import {
  genericQuantity,
  genericSchema,
  quantityFormSchema,
  singleProductFormSchema,
} from "@/schemas/formSchema";
import { useCallback, useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setInvoiceData, setRefetch } from "@/redux/features/tableReducer";
import { updateInvoice } from "@/api/invoices/invoice";
import { formProps } from "@/types/form";

type SingleQuantityValues = z.infer<typeof genericQuantity>;

const QuantityForm = ({ initialData }: formProps) => {
  const dispatch = useAppDispatch();
  const { refetch } = useAppSelector((state) => state.tableReducer);

  const form = useForm<SingleQuantityValues>({
    resolver: zodResolver(quantityFormSchema(initialData?.quantity?.stock)),
    defaultValues: {
      quantity: initialData?.quantity?.qty,
    },
  });

  const onSubmit = async (data: SingleQuantityValues) => {
    try {
      let newData = {
        quantity: data.quantity,
        total_price: data.quantity * initialData?.quantity?.price,
      };
      const res = await updateInvoice(initialData.id, newData);
      if (res.status === 200) {
        dispatch(setRefetch(!refetch));
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="relative flex flex-col justify-center items-center gap-2">
              <FormControl>
                <div className="relative flex items-center w-[8rem] justify-center">
                  <button
                    type="submit"
                    // type="button"
                    onClick={() => field.onChange(Math.max(field.value - 1, 1))}
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-1 focus:ring-2 focus:outline-none"
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
                    type="submit"
                    onClick={() =>
                      field.onChange(
                        Math.min(field.value + 1, initialData?.quantity.stock)
                      )
                    }
                    className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
                  >
                    <Plus className="w-3 h-3 text-gray-900" />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default QuantityForm;
