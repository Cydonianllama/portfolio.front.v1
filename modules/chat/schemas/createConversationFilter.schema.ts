import { z } from "zod/v3";

export const creationConversationFilterSchema = z.object({
  name: z.string().min(1, { message: "Necesita un nombre de más de 1 caracter" }).trim().nullish(),
  icon: z.string().optional(),
});

export type CreationConversationFilterSchema = z.infer<typeof creationConversationFilterSchema>;