/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response'
import { ListChatRequestDTO, ListChatResponseDTO } from '../dtos/dtos';

export const ListChats = async (data: ListChatRequestDTO): Promise<ResponseApi<ListChatResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/chats?page=${data.page}`)
    return req.data;
  } catch (ex) {
    return null
  }
}