import { z } from "zod/v3";

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(3, "Mínimo 3 caracteres"),

  password: z
    .string()
    .min(3, "Mínimo 6 caracteres")
});

export type LoginSchema = z.infer<typeof loginSchema>;