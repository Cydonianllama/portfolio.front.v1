import { z } from "zod/v3";

export const UpdateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Debe tener al menos 1 caracteres")
    .max(100)
    .nullish(),

  mainUserId: z.string().nullish(),
});

export type RequestUpdateWorkspace = z.infer<typeof UpdateWorkspaceSchema>;