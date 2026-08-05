import { z } from "zod/v3";

export const updateAutomationSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateAutomationSchema = z.infer<typeof updateAutomationSchema>;