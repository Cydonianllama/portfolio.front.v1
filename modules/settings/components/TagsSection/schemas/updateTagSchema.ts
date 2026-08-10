import { z } from "zod/v3";

// creation schema
export const updateTagSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  color: z.string().optional(),
});

export type UpdateTagSchema = z.infer<typeof updateTagSchema>;