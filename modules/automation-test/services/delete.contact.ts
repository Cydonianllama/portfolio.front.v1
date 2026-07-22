
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface DeleteContactTestAutomationRequestDTO {
  roomId: string
}

interface DeleteContactTestAutomationResponseDTO {
  contactId: string
}

export const DeleteContactTestAutomation= async (data: DeleteContactTestAutomationRequestDTO): Promise<ResponseApi<DeleteContactTestAutomationResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/test-automations?roomId=${data.roomId}`);
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