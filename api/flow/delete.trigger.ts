
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface DeleteTriggerRequestDTO {
  id: string
}

interface DeleteTriggerResponseDTO {
  id: string
}

export const DeleteTrigger = async (data: DeleteTriggerRequestDTO): Promise<ResponseApi<DeleteTriggerResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/triggers/${data.id}`);
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
