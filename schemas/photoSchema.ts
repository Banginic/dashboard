import { z } from "zod";

export const photoSchemas = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
  });

// Using react hook form
export const photoSchema = z.object({
  photo: z
    .custom<File>((file) => file instanceof File, {
      message: "Photo is required.",
    })
    .refine((file) => file && file.type.startsWith("image/"), {
      message: "Only images allowed.",
    })
    .refine((file) => file && file.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB.",
    }),
});
