import { z } from "zod/v3";

export const creationMembersSchema = z.object({
  email: z.string().email('Debe ser email').trim(),
  rolId: z.string().trim(),
});

export type CreationMembersSchema = z.infer<typeof creationMembersSchema>;