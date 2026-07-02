import { z } from "zod/v3";

export const UpdateMemberSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Debe ser un email válido")
    .optional(),

  status: z.number().optional(),
  rolId: z.string().optional(),
  invitationAccepted: z.boolean().optional(),
});

export type RequestUpdateMember = z.infer<typeof UpdateMemberSchema>;
