import { z } from "zod/v3";

export const updateSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1, "Debe tener al menos 1 caracteres")
    .max(500),
  workspaceId: z.string(),
  userId: z.string(),
});

export type UpdateSchema = z.infer<typeof updateSchema>;