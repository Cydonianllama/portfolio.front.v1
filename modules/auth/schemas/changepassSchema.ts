import { z } from "zod/v3";

export const changePassSchema = z.object({
  password: z.string().trim().min(1, "Debe tener al menos 1 caracteres").max(200),
  passwordConfirm: z.string().trim().min(1, "Debe tener al menos 1 caracteres").max(200),
});

export type RequestchangePassSchema = z.infer<typeof changePassSchema>;