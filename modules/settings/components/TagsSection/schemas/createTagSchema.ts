import { z } from "zod/v3";

// creation schema

export const creationTagSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  color: z.string().optional(),
});

export type CreationTagSchema = z.infer<typeof creationTagSchema>;
