const { z } = require("zod");

export const signUpFormSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, {
      message: "Username must be at least 3 chars",
    })
    .max(100, { message: "Username must not be more than 100 chars long" }),
  fullname: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(6, {
      message: "full name must be at least 6 chars",
    })
    .max(250, { message: "fullname must not be more than 250 chars long" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("This is not a valid email.")
    .min(3, {
      message: "Email must be at least 3 chars",
    })
    .max(255, { message: "Email must not be more than 255 chars long" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, {
      message: "Password must be at least 6 chars",
    })
    .max(20, { message: "Password must not be more than 20 chars long" }),
});
