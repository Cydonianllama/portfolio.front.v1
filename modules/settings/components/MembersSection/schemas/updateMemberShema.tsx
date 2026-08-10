import { z } from "zod/v3";


export const updateMembersSchema = z.object({
  rolId: z.string().trim().nullish(),
  status: z.number().nullish(),
});

export type UpdateMembersSchema = z.infer<typeof updateMembersSchema>;
