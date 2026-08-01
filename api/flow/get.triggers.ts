
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { TriggerDTO } from './trigger.dto';

export interface GetTriggersRequestDTO {
  triggers: Array<string>
}

interface GetTriggersResponseDTO {
  list: Array<TriggerDTO>
}

export const GetTriggers = async (data: GetTriggersRequestDTO): Promise<ResponseApi<GetTriggersResponseDTO> | null> => {
  try {

    if (data.triggers.length == 0) {
      console.warn(`GetTriggers not executed`)
      return null
    }

    const req = await api.get(`/api/triggers?triggers=${data.triggers.join(',')}`);
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