
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface RemoveNodeRequestDTO {
  id: string
}

interface RemoveNodeResponseDTO {
  id: string
}

export const RemoveNode= async (data: RemoveNodeRequestDTO): Promise<ResponseApi<RemoveNodeResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/flows/nodes/${data.id}`);
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