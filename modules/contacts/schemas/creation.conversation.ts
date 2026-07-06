import { z } from "zod/v3";

const CreateRoomParticipantSchema = z.object({
  contactId: z.string(),
});

export const creationConversationSchema = z.object({
  participants: z.array(CreateRoomParticipantSchema).optional().default([]).nullish(),
  workspaceId: z.string().min(1, { message: "El workspaceId es requerido" }).max(500, { message: "El workspaceId no puede superar los 50 caracteres" }).trim().nullish(),
  integrationId: z.string().min(1, { message: "integrationId es requerido" }).max(500, { message: "integrationId no puede superar los 50 caracteres" }).trim().nullish(),
});

export type CreationConversationSchema = z.infer<typeof creationConversationSchema>;