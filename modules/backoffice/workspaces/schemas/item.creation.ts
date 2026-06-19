import { z } from "zod/v3";

export const CreateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Debe tener al menos 1 caracteres")
    .max(200),

  mainUserId: z.string(),
});

export type RequestCreateWorkspace = z.infer<typeof CreateWorkspaceSchema>;