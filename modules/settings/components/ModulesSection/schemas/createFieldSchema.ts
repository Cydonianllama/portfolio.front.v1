import { z } from "zod/v3";

// creation schema

export const creationFieldSchema = z.object({
  name: z.string().min(1, "Mínimo 3 caracteres"),
  color: z.string().nullish(),
  icon: z.string().nullish(),
  type: z.string()
});

export type CreationFieldSchema = z.infer<typeof creationFieldSchema>;
