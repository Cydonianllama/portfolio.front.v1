import { z } from "zod/v3";

export const updateFolderSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateFolderSchema = z.infer<typeof updateFolderSchema>;
