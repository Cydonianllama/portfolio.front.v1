
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { TriggerDTO } from './trigger.dto';

export interface GetTriggerRequestDTO {
  triggerId: string
}

interface GetTriggerResponseDTO {
  list: TriggerDTO | null
}

export const GetTrigger = async (data: GetTriggerRequestDTO): Promise<ResponseApi<GetTriggerResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/triggers/${data.triggerId}`);
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