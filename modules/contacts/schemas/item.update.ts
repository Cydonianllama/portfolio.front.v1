import { z } from "zod/v3";

export const updateSchema = z.object({
  fullname: z.string().min(3, "Mínimo 3 caracteres"),
  mainEmail: z.string().trim().nullish(),
  mainDirection: z.string().trim().nullish(),
  mainPhone: z.string().trim().nullish(),
});

export type UpdateSchema = z.infer<typeof updateSchema>;