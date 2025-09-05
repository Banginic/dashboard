import { z } from "zod";

//Site Information
export const SiteInformationSchema = z.object({
  projectName: z
    .string()
    .min(1, { message: "Project name is required" })
    .min(6, { message: "Project name be at least 6 letters" })
    .max(50, { message: "Project name be at most 50 letters" }),

  tagLine: z
    .string()
    .min(1, { message: "Tag line is required" })
    .min(16, { message: "Tag line must be at least 15 letters" })
    .max(50, { message: "Tag line should be at most 50 letters" }),
});

export type SiteInformationSchemaType = z.infer < typeof SiteInformationSchema>