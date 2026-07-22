
// ______________ Service

import { RoomDTO } from '@/api/chat/chat.dto';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface GetContactsTestAutomationRequestDTO {
  workspaceId: string
}

interface GetContactsTestAutomationResponseDTO {
  list: Array<RoomDTO>
}

export const GetContactsTestAutomation= async (data: GetContactsTestAutomationRequestDTO): Promise<ResponseApi<GetContactsTestAutomationResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/test-automations/contacts?workspaceId=${data.workspaceId}`);
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