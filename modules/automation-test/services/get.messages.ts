
// ______________ Service

import { MessageDTO } from '@/api/chat/chat.dto';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface GetMessagesTestContactRequestDTO {
  roomId: string
}

interface GetMessagesTestContactResponseDTO {
  list: Array<MessageDTO>
}

export const GetMessagesTestContact= async (data: GetMessagesTestContactRequestDTO): Promise<ResponseApi<GetMessagesTestContactResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/test-automations/messages?roomId=${data.roomId}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}