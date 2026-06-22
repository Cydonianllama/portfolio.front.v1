import { z } from "zod/v3";

export const updateSchema = z.object({
  fullname: z.string().trim(),
  workspaceId: z.string().trim(),
});

export type UpdateSchema = z.infer<typeof updateSchema>;