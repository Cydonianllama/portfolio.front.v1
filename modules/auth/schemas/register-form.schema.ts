import { z } from "zod/v3";

export const registerSchema = z.object({
  fullname: z.string().min(3, "Mínimo 3 caracteres"),
  email: z.string().email().min(3, "Mínimo 6 caracteres"),
  password: z.string().min(3, "Mínimo 6 caracteres"),
  confirmPassword: z.string().min(3, "Mínimo 6 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;