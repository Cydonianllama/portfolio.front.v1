
import { z } from "zod/v3";

// update schema

export const updateEntitySchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateEntitySchema = z.infer<typeof updateEntitySchema>;