import { z } from "zod/v3";

export const CreateMemberSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El email es requerido")
    .email("Debe ser un email válido"),

  rolId: z.string().optional(),
});

export type RequestCreateMember = z.infer<typeof CreateMemberSchema>;
