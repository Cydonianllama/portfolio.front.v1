import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { CreateChatRequestDTO, CreateChatResponseDTO, ListChatRequestDTO, ListChatResponseDTO, OpenChatRequestDTO, OpenChatResponseDTO, SendMessageRequestDTO, SendMessageResponseDTO } from './chat.dto';


export const CreateChat = async (config: CreateChatRequestDTO): Promise<ResponseApi<CreateChatResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/chats/`, config);
    return req.data
  } catch (ex) {
    return null;
  }
}

export const OpenChat = async (config: OpenChatRequestDTO): Promise<ResponseApi<OpenChatResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/chats/open/${config.roomId}`, config);
    return req.data
  } catch (ex) {
    return null;
  }
}

export const ListChats = async (data: ListChatRequestDTO): Promise<ResponseApi<ListChatResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/chats?page=${data.page}`)
    return req.data;
  } catch (ex) {
    return null
  }
}

export const SendMessage = async (data: SendMessageRequestDTO): Promise<ResponseApi<SendMessageResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/chats/${data.roomId}/send-message`, data)
    return req.data;
  } catch (ex) {
    return null
  }
}