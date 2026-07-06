export interface MessageDTO {
  id: string;
  message: string;
  roomId: string;
  creationDate: Date;
}

export interface RoomDTO {
  id: string;
  name: string;
  workspaceId: string;
  platformId: string;
  participants: Array<{
    contactId: string
  }>;
  creationDate: Date;
}

// create chat
export interface CreateChatResponseDTO {
  room: RoomDTO | null
}

export interface CreateChatRequestDTO {
  workspaceId: string
  integrationId: string
  participants: Array<{
    contactId: string
  }>,
}

// list chat
export interface ListChatRequestDTO {
  page: number;
}

export interface ListChatResponseDTO {
  list: Array<RoomDTO>
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
export interface OpenChatResponseDTO {
  messages: Array<MessageDTO>
  totalMessage: number
  room: RoomDTO
}

export interface OpenChatRequestDTO {
  roomId: string
}