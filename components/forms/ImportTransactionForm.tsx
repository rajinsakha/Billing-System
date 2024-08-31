"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { importFormSchema } from "@/schemas/formSchema";
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

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { setRefetch } from "@/redux/features/tableReducer";
import { useState } from "react";
import { generateNepaliDate } from "@/lib/calculation";
import { useToast } from "../ui/use-toast";
import { addImport, updateImport } from "@/api/import/importTransactionAPI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type ImportFormValues = z.infer<typeof importFormSchema>;

const ImportTransactionForm = ({ initialData }: formProps) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const title = initialData ? "Edit Import" : "New Import";
  const { singleData, categoryDropdown, subCategoryDropdown, refetch } =
    useAppSelector((state) => state.tableReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = initialData
    ? {
        name: initialData.name,
        quantity: initialData.stock,
        total_amount: initialData.total_amount,
        bill_no: initialData.bill_no,
        mode_of_payment: initialData.mode_of_payment,
        paid_amount: initialData.paid_amount,
      }
    : {
        name: "",
        quantity: null,
        total_amount: null,
        bill_no: null,
        paid_amount: null,
        mode_of_payment: "",
      };

  const form = useForm<ImportFormValues>({
    resolver: zodResolver(importFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ImportFormValues) => {
    setIsSubmitting(true);
    try {
   
      if (initialData) {
        const transformedData = {
          ...data,

          mode_of_payment: initialData.credit_amount === 0 ? "cash" : "credit",
          credit_amount: data.total_amount - data.paid_amount,
          invoice_miti: generateNepaliDate(),
        };
        const res = await updateImport(singleData.id, transformedData);
        if (res.status === 200) {
          document.getElementById("closeDialog")?.click();
          dispatch(setRefetch(!refetch));
          toast({
            variant: "default",
            title: "Import Transaction Updated",
            description: `Import Transaction has been successfully updated`,
            duration: 3000,
          });
        }
      } else {
        const transformedData = {
          ...data,
          Bill_no: data.bill_no,
          credit_amount: data.total_amount - data.paid_amount,
          invoice_miti: generateNepaliDate(),
        };
        const res = await addImport(transformedData);
        if (res.status === 201) {
          document.getElementById("closeDialog")?.click();
          dispatch(setRefetch(!refetch));
          toast({
            variant: "default",
            title: "New Import Transaction Added",
            description: `Import Transaction has been successfully added `,
            duration: 3000,
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
                  <FormLabel>Importer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Importer Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bill_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill No.</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Bill No." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Quantity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={`grid grid-cols-2  gap-4`}>
              <FormField
                control={form.control}
                name="total_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter total_amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!initialData && <FormField
                control={form.control}
                name="mode_of_payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mode of Payment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Payment Mode"
                            defaultValue={field.value?.toString()}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="credit">Credit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />}


            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paid_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter paid_amount"
                        {...field}
                      />
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

export default ImportTransactionForm;
