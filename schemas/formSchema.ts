import { z } from "zod";


export const authenticationFormSchema = z.object({
  username: z.string().min(3,{
    message: "Username must be at least 3 characters."
  }),
  password: z
  .string()
  .trim()
  .refine((val) => val.length > 0, {
    message: "Password cannot be empty.",
  })
  .refine((val) => val.length >= 8, {
    message: "Password must be at least 8 characters long.",
  })
  .refine((val) => val.length <= 20, {
    message: "Password must be at most 20 characters long.",
  })
})


export const productFormSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters.",
    })
    .optional(),
  price: z
    .number()
    .nonnegative({ message: "Price must be a non-negative number" }),
  category: z.string().min(3, {
    message: "Category must be selected.",
  }),
  sub_category: z.string().optional(),
  quantity: z
    .number()
    .nonnegative({ message: "Quantity must be a non-negative number" }),
});

export const genericSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const singleInvoiceSchema = (stock:number) =>
  z.object({
    quantity: z
    .number()
    .nonnegative({ message: "Quantity must be a non-negative number" })
    .max(stock, `Quantity must be less than or equal to ${stock}`)
    .min(1, { message: "Quantity must be at least 1" }),
  })
  

export const singleProductFormSchema = (stock:number)=>
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

  export const categoryFormSchema = z.object({
    name: z.string().min(3,{
      message:"Category must be at least 3 characters."
    })
  })

  export const subCategoryFormSchema = z.object({
    category: z.string().min(3,{
      message:"Category must be selected."
    }),
    name: z.string().min(3,{
      message:"Sub-Category must be at least 3 characters."
    }),

  })
