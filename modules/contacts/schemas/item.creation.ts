import { z } from "zod/v3";

export const creationSchema = z.object({
  fullname: z.string().min(3, "Mínimo 3 caracteres"),
  mainPhone: z.string().nullish(),
  mainEmail: z.string().nullish(),
  mainDirection: z.string().nullish(),
});

export type CreationSchema = z.infer<typeof creationSchema>;