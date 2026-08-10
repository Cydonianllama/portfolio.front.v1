
import { z } from "zod/v3";

export const updateVariablesSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateVariablesSchema = z.infer<typeof updateVariablesSchema>;