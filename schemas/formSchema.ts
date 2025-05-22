import { z } from "zod";

export const authenticationFormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email("Invalid email address."),
  password: z
    .string()
    .trim()
    .refine((val) => val.length > 0, {
      message: "Password cannot be empty.",
    }),
});

export const productFormSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  quantity: z.coerce
    .number()
    .nonnegative({ message: "Quantity must be a non-negative number" }),
  price: z.coerce
    .number()
    .nonnegative({ message: "Price must be a non-negative number" }),
  category: z.string().min(1, {
    message: "Category must be selected.",
  }),
  sub_category: z.string().optional(),
  unit: z.string().optional(),
});

export const importFormSchema = z.object({
  name: z.string().min(3, {
    message: "Importer name must be at least 3 characters.",
  }),
  bill_no: z.string().min(1, {
    message: "Bill No is Required.",
  }),
  quantity: z.coerce
    .number()
    .nonnegative({ message: "Quantity must be a non-negative number" }),
  total_amount: z.coerce
    .number()
    .nonnegative({ message: "Amount must be a non-negative number" }),
  mode_of_payment: z.string().min(1, {
    message: "Payment Mode is Required.",
  }),
  paid_amount: z.coerce
    .number()
    .nonnegative({ message: "Amount must be a non-negative number" }),
});

export const genericSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const genericQuantity = z.object({
  quantity: z.number(),
});

export const genericTransaction = z.object({
  new_amt: z.number(),
});

export const singleInvoiceSchema = (stock: number) =>
  z.object({
    quantity: z
      .number()
      .nonnegative({ message: "Quantity must be a non-negative number" })
      .max(stock, `Quantity must be less than or equal to ${stock}`)
      .min(1, { message: "Quantity must be at least 1" }),
  });

export const singleProductFormSchema = (stock: number) =>
  z.object({
    name: z.string().min(3, {
      message: "Product name must be at least 3 characters.",
    }),
    price: z
      .number()
      .nonnegative({ message: "Price must be a non-negative number" }),
    quantity: z
      .number()
      .nonnegative({ message: "Quantity must be a non-negative number" })
      .max(stock, `Quantity must be less than or equal to ${stock}`)
      .min(1, { message: "Quantity must be at least 1" }),
  });

export const transactionFormSchema = (amount: number) =>
  z.object({
    new_amt: z
      .number()
      .nonnegative({ message: "Amount must be a non-negative number" })
      .max(amount, `Amount must be less than or equal to ${amount}`)
      .min(1, { message: "Amount must be at least 1" }),
  });

export const quantityFormSchema = (stock: number) =>
  z.object({
    quantity: z
      .number()
      .nonnegative({ message: "Quantity must be a non-negative number" })
      .max(stock, `Quantity must be less than or equal to ${stock}`)
      .min(1, { message: "Quantity must be at least 1" }),
  });

export const categoryFormSchema = z.object({
  name: z.string().min(3, {
    message: "Category must be at least 3 characters.",
  }),
});

export const subCategoryFormSchema = z.object({
  name: z.string().min(3, {
    message: "Sub-Category must be at least 3 characters.",
  }),
});

export const invoiceFormSchema = z.object({
  customer_name: z.string().min(3, {
    message: "Customer name must be at least 3 characters.",
  }),
  address: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
});
