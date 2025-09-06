import { z } from "zod";

export const JobSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(6, { message: "Title must be at least 6 letters" })
    .max(25, { message: "Title should be at most 25 letters" }),

  location: z
    .string()
    .min(1, { message: "Location is required" })
    .min(3, { message: "Location must be at least 3 letters" })
    .max(25, { message: "Location should be at most 25 letters" }),

  description: z
    .string()
    .min(1, { message: "Description is required" })
    .min(8, { message: "Description must be at least 8 letters" })
    .max(500, { message: "Description should be at most 500 letters" }),

  latestDate: z
    .string()
    .min(1, { message: "Latest date is required" })

});

export type JobSchemaType = z.infer < typeof JobSchema>