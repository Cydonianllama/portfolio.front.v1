import { z } from "zod/v3";

export const updateSchema = z.object({
  fullname: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateSchema = z.infer<typeof updateSchema>;