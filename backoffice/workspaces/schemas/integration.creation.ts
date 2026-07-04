import { z } from "zod";

export const CreateIntegrationSchema = z.object({
  code: z.string().trim()
});

export type RequestCreateIntegration = z.infer<typeof CreateIntegrationSchema>;