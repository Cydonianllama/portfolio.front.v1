import { z } from "zod/v3";

export const creationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Debe tener al menos 1 caracteres")
    .max(500),
  workspaceId: z
    .string()
    .trim()
    .min(1, "Debe tener al menos 1 caracteres"),
  userCreationId: z.string()
});

export type CreationSchema = z.infer<typeof creationSchema>;