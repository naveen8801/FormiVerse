import { z } from "zod";

export const profileFormSchema = z
  .object({
    fullname: z.string().trim().optional(),
    password: z.string().trim().optional(),
    confirmPassword: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    const hasFullname = data.fullname && data.fullname.trim() !== "";
    const hasPassword = data.password && data.password.trim() !== "";
    const hasConfirmPassword =
      data.confirmPassword && data.confirmPassword.trim() !== "";

    // Check for no input at all
    if (!hasFullname && !hasPassword && !hasConfirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No data to update",
        path: [], // root-level issue
      });
      return;
    }

    // Validate fullname if provided
    if (hasFullname) {
      if (data.fullname!.length < 6 || data.fullname!.length > 250) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Full name must be between 6 and 250 characters",
          path: ["fullname"],
        });
      }
    }

    // Validate password/confirmPassword
    if (hasPassword || hasConfirmPassword) {
      if (!data.confirmPassword && data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Confirm Password should be provided",
          path: ["confirmPassword"],
        });
      }

      if (data.confirmPassword && !data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password should be provided",
          path: ["password"],
        });
      }

      if (data.password!.length < 6 || data.password!.length > 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be between 6 and 20 characters",
          path: ["password"],
        });
      }

      if (
        data.confirmPassword!.length < 6 ||
        data.confirmPassword!.length > 20
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Confirm Password must be between 6 and 20 characters",
          path: ["confirmPassword"],
        });
      }

      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match",
          path: ["confirmPassword"],
        });
      }
    }
  });
