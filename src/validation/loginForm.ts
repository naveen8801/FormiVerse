const { z } = require("zod");

export const loginFormSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, {
      message: "Username must be at least 3 chars",
    })
    .max(100, { message: "Username must not be more than 100 chars long" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, {
      message: "Password must be at least 6 chars",
    })
    .max(20, { message: "Password must not be more than 20 chars long" }),
});
