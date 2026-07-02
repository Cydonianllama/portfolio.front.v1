import { z } from "zod/v3";

export const creationSchema = z.object({
  name: z.string(),
  color: z.string().nullish(),
});

export type CreationSchema = z.infer<typeof creationSchema>;