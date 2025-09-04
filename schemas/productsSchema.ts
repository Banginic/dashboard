import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(6, { message: "Name must be at least 6 letters" })
    .max(25, { message: "Name must be at most 25 letters" }),

  category: z
    .string()
    .min(1, { message: "Category is required" })
    .max(30, { message: "Category must be at most 30 letters" }),

  subCategory: z
    .string()
    .min(1, { message: "Sub category is required" })
    .max(30, { message: "Sub category  must be at most 30 letters" }),
    
  allergies: z
    .string()
    .min(1, { message: "Allergies is required" })
    .max(30, { message: "Allergies  must be at most 50 letters" }),
    
  rating: z
    .number()
    .min(1, { message: "Rating is required" })
    .max(5, { message: "Rating must be at most 5" }),


  price: z
    .number()
    .min(1, { message: "Price is required" }),

  description: z
    .string()
    .min(1, { message: "Description is required" })
    .min(8, { message: "Description must be at least 8 letters" })
    .max(500, { message: "Description should be at most 500 letters" }),
});

export type ProductSchemaType = z.infer < typeof ProductSchema>