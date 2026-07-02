import { z } from "zod/v3";

export const creationSchema = z.object({
  fullname: z.string().trim(),
  workspaceId: z.string().trim(),
});

export type CreationSchema = z.infer<typeof creationSchema>;