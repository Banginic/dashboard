import { z } from "zod";

export const MessageReplySchema = z.object({

   subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .min(6, { message: "Subject must be at least 6 letters" })
    .max(50, { message: "Subject should be at most 50 letters" }),


  message: z
    .string()
    .min(1, { message: "Body is required" })
    .min(8, { message: "Body must be at least 8 letters" })
    .max(500, { message: "Body should be at most 500 letters" }),
});

export type MessageReplySchemaType = z.infer < typeof MessageReplySchema>