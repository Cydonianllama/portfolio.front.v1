
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface UpdateTriggerRequestDTO {
  workspaceId: string
}

interface UpdateTriggerResponseDTO {
  list: Array<{ id: string, name: string }>
}

export const UpdateTrigger = async (data: UpdateTriggerRequestDTO): Promise<ResponseApi<UpdateTriggerResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/triggers/`);
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