import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(10, "Password must be at least 10 characters"),
});

export type TsignInSchema = z.infer<typeof logInSchema>;
