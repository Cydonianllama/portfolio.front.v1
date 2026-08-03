
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { TriggerDTO } from './trigger.dto';

export interface CreateTriggerRequestDTO {
  workspaceId: string
  platform: number
  type: number
  automationId: string
  keyConfiguration?: Array<{
    criteria?: number | null
    words?: Array<string> | null
  }> | null
}

interface CreateTriggerResponseDTO {
  trigger: TriggerDTO | null
}

export const CreateTrigger = async (data: CreateTriggerRequestDTO): Promise<ResponseApi<CreateTriggerResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/triggers`, data);
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
