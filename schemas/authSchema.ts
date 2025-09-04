import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(6, { message: "Name must be at least 6 letters" })
    .max(25, { message: "Name should be at most 25 letters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .min(8, { message: "Email must be at least 8 letters" })
    .max(30, { message: "Email should be at most 30 letters" })
    .email(),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(9, { message: "Phone number should be at least 9 letters" })
    .max(15, { message: "Phone number should be at most 15 letters" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 letters" })
    .max(12, { message: "Password should be at most 12 letters" }),
});

export type SignUpSchemaType = z.infer < typeof SignUpSchema>


export const SignInSchema = z.object({

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .min(8, { message: "Email must be at least 8 letters" })
    .max(30, { message: "Email should be at most 30 letters" })
    .email(),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 letters" })
    .max(12, { message: "Password should be at most 12 letters" }),
});

export type SignInSchemaType = z.infer < typeof SignInSchema>