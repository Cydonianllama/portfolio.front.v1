import { z } from "zod";

export const UpdateIntegrationSchema = z.object({
  alias: z.string().trim(),
  id: z.string().trim(),
});

export type RequestUpdateIntegration = z.infer<typeof UpdateIntegrationSchema>;