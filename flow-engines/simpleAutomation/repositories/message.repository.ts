import type { Message } from "../models/message.js";

export interface IMessageRepository {
  CreateMessage: (data: CreateMessageRequest) => Promise<CreateMessageResult>;
}

export interface CreateMessageRequest {
  roomId: string;
}

export interface CreateMessageResult {
  status: boolean,
  message: Message | null
}