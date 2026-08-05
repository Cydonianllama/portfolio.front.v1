import { z } from "zod/v3";

export const creationAutomationSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationAutomationSchema = z.infer<typeof creationAutomationSchema>;