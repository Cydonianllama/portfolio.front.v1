import { z } from "zod/v3";

export const backofficeLoginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(3, "Minimo 3 caracteres"),

  password: z
    .string()
    .min(3, "Minimo 3 caracteres")
});

export type BackofficeLoginSchema = z.infer<typeof backofficeLoginSchema>;
