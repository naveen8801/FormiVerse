const { z } = require("zod");

export const formSchema = z.object({
  title: z
    .string({ required_error: "Form title is required" })
    .trim()
    .min(6, {
      message: "Form title must be at least 3 chars",
    })
    .max(250, { message: "Form title must not be more than 100 chars long" }),
  description: z
    .string()
    .trim()
    .min(0, {
      message: "Description must be at least 6 chars",
    })
    .max(300, { message: "Description must not be more than 300 chars long" }),
  formSchema: z
    .string({ required_error: "Form schema is required" })
    .min(1, { message: "Form schema is required" }),
});
