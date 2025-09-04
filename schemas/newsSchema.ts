import { z } from "zod";

export const NewsSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .min(6, { message: "Subject must be at least 6 letters" })
    .max(50, { message: "Subject should be at most 50 letters" }),

  message: z
    .string()
    .min(1, { message: "Message is required" })
    .min(8, { message: "Message must be at least 8 letters" })
    .max(500, { message: "Message should be at most 500 letters" }),
});

export type NewsSchemaType = z.infer < typeof NewsSchema>