import { z } from "zod/v3";

export const ForgetPasswordSchema = z.object({
  email: z.string().email().trim().min(1, "Debe tener al menos 1 caracteres").max(200)
});

export type RequestForgetPasswordSchema = z.infer<typeof ForgetPasswordSchema>;