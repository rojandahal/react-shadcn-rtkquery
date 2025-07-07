import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;
const passwordRegexMessage =
  "Password must have uppercase, lowercase, and a number.";

const createAdminSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(32, { message: "Username must be at most 32 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(passwordRegex, {
        message: passwordRegexMessage,
      }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const { confirmPassword, password } = data;
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(passwordRegex, {
        message: passwordRegexMessage,
      }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const { confirmPassword, newPassword } = data;
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const changePasswordSchema = z
  .object({
    originalPassword: z.string(),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(passwordRegex, {
        message: passwordRegexMessage,
      }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const { confirmPassword, newPassword } = data;
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export {
  createAdminSchema,
  resetPasswordSchema,
  changePasswordSchema,
};
