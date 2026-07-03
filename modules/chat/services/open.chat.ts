/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response'
import { OpenChatRequestDTO, OpenChatResposeDTO } from '../dtos/dtos';

export const OpenChat = async (data: OpenChatRequestDTO): Promise<ResponseApi<OpenChatResposeDTO> | null> => {
  try {
    const req = await api.post(`/api/chats/open/${data.roomId}`)
    return req.data;
  } catch (ex) {
    return null
  }
}