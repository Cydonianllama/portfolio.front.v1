
import { z } from "zod/v3";

// creation schema

export const creationVariablesSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationVariablesSchema = z.infer<typeof creationVariablesSchema>;