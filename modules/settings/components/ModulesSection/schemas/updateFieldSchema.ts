import { z } from "zod/v3";

// update schema

export const updateFieldSchema = z.object({
  name: z.string().min(1, "Mínimo 3 caracteres"),
});

export type UpdateFieldSchema = z.infer<typeof updateFieldSchema>;