
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

interface ServiceNameRequestDTO {
  workspaceId: string
}

interface ServiceNameResponseDTO {
  list: Array<{ id: string, name: string }>
}

export const ServiceName = async (data: ServiceNameRequestDTO): Promise<ResponseApi<ServiceNameResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/entity_api`);
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