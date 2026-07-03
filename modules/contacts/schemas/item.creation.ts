import { z } from "zod/v3";

export const creationSchema = z.object({
  fullname: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationSchema = z.infer<typeof creationSchema>;