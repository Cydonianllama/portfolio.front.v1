
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { RoomDTO } from '../chat/chat.dto';

export interface GetContactConversationsRequestDTO {
  contactId: string
}

interface GetContactConversationsResponseDTO {
  list: Array<RoomDTO>
}

export const GetContactConversations = async (data: GetContactConversationsRequestDTO): Promise<ResponseApi<GetContactConversationsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/contacts/${data.contactId}/conversations`);
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