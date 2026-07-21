
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface DeleteIntegrationItemRequestDTO {
  workspaceId: string;
  id: string
}

interface DeleteIntegrationItemResponseDTO {
  list: Array<{ id: string, name: string }>
}

export const DeleteIntegrationItem = async (data: DeleteIntegrationItemRequestDTO): Promise<ResponseApi<DeleteIntegrationItemResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/workspaces/${data.workspaceId}/integrations/${data.id}`);
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