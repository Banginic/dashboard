import { z } from "zod";

export const TestimonialSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(6, { message: "Name must be at least 6 letters" })
    .max(25, { message: "Name should be at most 25 letters" }),

  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(8, { message: "Title must be at least 8 letters" })
    .max(25, { message: "Title should be at most 25 letters" }),

  rating: z
    .number()
    .min(1, { message: "Rating is required" })
    .max(5, { message: "Rating should be at most 5 " }),

  message: z
    .string()
    .min(1, { message: "Message is required" })
    .min(8, { message: "Message must be at least 8 letters" })
    .max(90, { message: "Message should be at most 90 letters" }),

//  photo: z
//  .instanceof(File, { message: 'A photo is required.'})

});

export type TestimonialSchemaType = z.infer<typeof TestimonialSchema>;
