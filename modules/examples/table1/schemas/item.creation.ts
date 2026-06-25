import { z } from "zod/v3";

export const creationSchema = z.object({
  name: z
    .string()
    .min(3, "Mínimo 3 caracteres"),

  description: z
    .string()
    .min(10, "Mínimo 10 caracteres"),

  units: z
    .number()
    .max(5000)
});

export type CreationSchema = z.infer<typeof creationSchema>;