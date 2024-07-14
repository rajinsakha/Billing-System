"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import {
  genericTransaction,
  productFormSchema,
  transactionFormSchema,
} from "@/schemas/formSchema";
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
import { useEffect, useState } from "react";
import { updateTransaction } from "@/api/invoices/transaction";
import { init } from "next/dist/compiled/webpack/webpack";

export type TransactionFormValues = z.infer<typeof genericTransaction>;

const TransactionForm = ({ initialData }: formProps) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const title = "Edit Transaction";
  const { singleData, refetch } = useAppSelector((state) => state.tableReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(singleData);
  const [paidAmount, setPaidAmount] = useState<number>(
    Number(initialData.paid_amt)
  );
  const [creditAmount, setCreditAmount] = useState<number>(
    Number(initialData.credit_amt)
  );

  const defaultValues = {
    new_amt: undefined,
  };

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema(initialData?.credit_amt)),
    defaultValues,
  });

  const { watch } = form;

  const amount = watch("new_amt");

  useEffect(() => {
    if (amount !== undefined) {
      const newPaidAmount = Number(initialData.paid_amt) + Number(amount);
      const newCreditAmount = Number(initialData.credit_amt) - Number(amount);
      setPaidAmount(newPaidAmount);
      setCreditAmount(newCreditAmount);
    }
  }, [amount, initialData.paid_amt, initialData.credit_amt]);

  const onSubmit = async (data: TransactionFormValues) => {
    setIsSubmitting(true);
    try {
      const newData = {
        paid_amt: paidAmount,
        credit_amt: creditAmount,
        mode_of_payment: creditAmount === 0 ? "cash" : "credit",
      };
      const res = await updateTransaction(singleData.id, newData);
      if (res.status === 200) {
        document.getElementById("closeDialog")?.click();
        dispatch(setRefetch(!refetch));
        toast({
          variant: "default",
          title: "Transaction Updated",
          description: `Transaction has been successfully updated`,
        });
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

      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <h4>Paid Amount: </h4>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background ">
            {paidAmount}
          </div>
        </div>

        <div className="space-y-1">
          <h4>Credit Amount: </h4>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  ">
            {creditAmount}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full mt-4"
        >
          <div className="h-[15vh] overflow-y-scroll hide-scrollbar space-y-6">
            <FormField
              control={form.control}
              name="new_amt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Amount"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default TransactionForm;
