import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, "Password must be at least 5 characters"),
});

export type TlogInSchema = z.infer<typeof logInSchema>;
