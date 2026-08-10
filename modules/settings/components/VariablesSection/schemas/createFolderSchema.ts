
import { z } from "zod/v3";

export const creationFolderSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationFolderSchema = z.infer<typeof creationFolderSchema>;