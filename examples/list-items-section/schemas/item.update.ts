import { z } from "zod/v3";

export const updateSchema = z.object({
  name: z.string(),
  color: z.string().nullish(),
});

export type UpdateSchema = z.infer<typeof updateSchema>;