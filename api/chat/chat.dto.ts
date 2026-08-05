import { ResponsePagination } from "@/types/api/utils.pagination";
import { ContactDTO } from "../contacts/contacts.dto";

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
    contactId: string;
    contactName: string;
  }>;
  creationDate: Date;
  lastMessage: string;
  typeRoom: 'individual' | 'group'
  variables?: Array<{
    codeVariable: string;
    value: string;
    addedAt?: Date;
    updatedAt?: Date;
  }>
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
  workspaceId: string;
  filter?: string;
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
  paginationMessage: ResponsePagination | null
  room: RoomDTO | null
  contact: ContactDTO | null
}

export interface OpenChatRequestDTO {
  roomId: string
}

// list messages
export interface ListMessagesRequestDTO {
  page: number;
  roomId: string;
}

export interface ListMessagesResponseDTO {
  list: Array<MessageDTO>
}

// update room variables
export interface UpdateRoomVariablesRequestDTO {
  roomId: string;
  variables: Array<{
    codeVariable: string;
    value: string;
    addedAt?: Date;
    updatedAt?: Date;
  }>
}

export interface UpdateRoomVariablesResponseDTO {
  room: RoomDTO | null
}