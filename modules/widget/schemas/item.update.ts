import { z } from "zod/v3";

export const widgetUpdateSchema = z.object({
  name: z.string().min(1, "Mínimo 1 caracter").optional(),
  isDark: z.boolean().optional(),
  UIconfig: z.object({
    title: z.string().optional(),
    allowFiles: z.boolean().optional(),
    allowEmojis: z.boolean().optional(),
  }).optional(),
  conversationalConfig: z.object({
    firstMessageResponse: z.object({
      message: z.string().optional(),
    }).optional(),
  }).optional(),
});

export type WidgetUpdateSchema = z.infer<typeof widgetUpdateSchema>;
