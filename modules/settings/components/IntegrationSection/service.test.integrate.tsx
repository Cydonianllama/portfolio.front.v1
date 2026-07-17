
// ______________ Service

import { IntegrationDTO } from '@/api/integration/integration.dto';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface TestIntegrateOneRequestDTO {
  workspaceId: string;
  code: string;
}

interface TestIntegrateOneResponseDTO {
  integration: Array<IntegrationDTO>
}

export const TestIntegrateOne = async (data: TestIntegrateOneRequestDTO): Promise<ResponseApi<TestIntegrateOneResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/workspaces/${data.workspaceId}/integrations/testadd`, data);
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