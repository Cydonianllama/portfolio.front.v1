
import { z } from "zod/v3";

// creation schema

export const creationEntitySchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationEntitySchema = z.infer<typeof creationEntitySchema>;
