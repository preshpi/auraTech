import { z } from "zod";

export const signUpSchema = z
  .object({
    firstname: z
      .string({ required_error: "First Name is required" })
      .min(1, "First Name is required"),
    lastname: z
      .string({ required_error: "Last Name is required" })
      .min(1, "Last Name is required"),
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters"),
    phone: z.string().min(11, "Phone number must be at least 11 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(5, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TsignUpSchema = z.infer<typeof signUpSchema>;
