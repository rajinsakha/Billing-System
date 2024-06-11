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
import { Button } from "./button";
import { genericSchema, singleProductFormSchema } from "@/schemas/formSchema";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

// Define the type based on the schema
type SingleProductFormValues = z.infer<typeof genericSchema>;

const ProductCard = ({ title, price, stock }: IProductCard) => {
  const form = useForm<SingleProductFormValues>({
    resolver: zodResolver(singleProductFormSchema(stock)),
    defaultValues: {
      name: title,
      price: price,
      quantity: 1,
    },
  });

  const onSubmit = async (data: SingleProductFormValues) => {
    try {
      console.log("Form data submitted:", data);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="flex flex-col items-center">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Price: Rs{price}</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 ">
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
                        type="button"
                        onClick={() =>
                          field.onChange(Math.min(field.value + 1, stock))
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

            <Button>Add to Invoice</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ProductCard;
