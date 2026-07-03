/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

// list chat
export interface ListChatRequestDTO {
  page: number;
}

export interface ListChatResponseDTO {
  list: Array<ChatDTO>
}

// send message
export interface SendMessageRequestDTO {
  message: string;
  roomId: string;
}

export interface SendMessageResponseDTO {
  message: MessageDTO | null
}

// open chat
export interface OpenChatRequestDTO {
  roomId: string
}

export interface OpenChatResposeDTO {
  messages: Array<MessageDTO>
}

// DTO general

export interface MessageDTO {
  id: string;
  message: string;
  roomId: string;
  creationDate: Date;
}

export interface ChatDTO {
  id: string;
  creationDate: Date;
  name: string;
  lastMessage: string;
}