import { z } from "zod";

export const EmployeeSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(6, { message: "Name must be at least 6 letters" })
    .max(25, { message: "Name should be at most 25 letters" }),

  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .min(8, { message: "Phone must be at least 8 numbers" })
    .max(15, { message: "Phone should be at most 15 numbers" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .min(8, { message: "Email must be at least 8 characters" })
    .max(25, { message: "Email should be at most 25 characters" }),

  position: z
    .string()
    .min(1, { message: "Position is required" })
    .min(8, { message: "Position must be at least 8 letters" })
    .max(25, { message: "Position should be at most 25 letters" }),

  qualification: z
    .string()
    .min(1, { message: "Qualification is required" })
    .min(8, { message: "Qualification must be at least 8 letters" })
    .max(50, { message: "Qualification should be at most 50 letters" }),

  bio: z
    .string()
    .min(1, { message: "Bio is required" })
    .min(8, { message: "Bio must be at least 8 letters" })
    .max(500, { message: "Bio should be at most 500 letters" }),
    
  // photo: z
  //   .union([
  //     z
  //       .instanceof(File, { message: "Photo is required" })
  //       .refine((file) => !file || file.size !== 0 || file.size <= 5000000, {
  //         message: "Photo should be at most 5MB",
  //       }),
  //     z.string().optional(), // to hold default Photo
  //   ])
  //   .refine((value) => value instanceof File || typeof value === "string", {
  //     message: "Photo is required",
  //   }),
});

export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>;
