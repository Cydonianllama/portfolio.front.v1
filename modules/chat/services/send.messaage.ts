/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response'
import { SendMessageRequestDTO, SendMessageResponseDTO } from '../dtos/dtos';

export const SendMessage = async (data: SendMessageRequestDTO): Promise<ResponseApi<SendMessageResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/chats/${data.roomId}/send-message`, data)
    return req.data;
  } catch (ex) {
    return null
  }
}