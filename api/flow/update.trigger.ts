
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { TriggerDTO } from './trigger.dto';

export interface UpdateTriggerRequestDTO {
  id: string
  keyConfiguration?: Array<{
    criteria?: number | null
    words?: Array<string> | null
  }> | null
  isActive?: boolean
}

interface UpdateTriggerResponseDTO {
  trigger: TriggerDTO | null
}

export const UpdateTrigger = async (data: UpdateTriggerRequestDTO): Promise<ResponseApi<UpdateTriggerResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/triggers/${data.id}`, {
      keyConfiguration: data.keyConfiguration,
      isActive: data.isActive
    });
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
