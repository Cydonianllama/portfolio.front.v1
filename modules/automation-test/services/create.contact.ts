
// ______________ Service

import { RoomDTO } from '@/api/chat/chat.dto';
import { ContactDTO } from '@/api/contacts/contacts.dto';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface CreateContactTestAutomationRequestDTO {
  name: string
  workspaceId: string
}

interface CreateContactTestAutomationResponseDTO {
  contact: ContactDTO | null,
  room: RoomDTO | null
}

export const CreateContactTestAutomation = async (data: CreateContactTestAutomationRequestDTO): Promise<ResponseApi<CreateContactTestAutomationResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/test-automations`, data);
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