import { z } from "zod";

export const MessageSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(6, { message: "Name must be at least 6 letters" })
    .max(25, { message: "Name should be at most 25 letters" }),

   subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .min(6, { message: "Subject must be at least 6 letters" })
    .max(50, { message: "Subject should be at most 50 letters" }),

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

  message: z
    .string()
    .min(1, { message: "Body is required" })
    .min(8, { message: "Body must be at least 8 letters" })
    .max(500, { message: "Body should be at most 500 letters" }),
});

export type MessageSchemaType = z.infer < typeof MessageSchema>