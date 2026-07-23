
// ______________ Service

import { IPublishedAutomation } from '@/flow-engines/simpleAutomation/models/published.automation';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface PublishAutomationRequestDTO {
  automationId: string
}

interface PublishAutomationResponseDTO {
  publishedAutomation: IPublishedAutomation | null
}

export const PublishAutomation= async (data: PublishAutomationRequestDTO): Promise<ResponseApi<PublishAutomationResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/flows/publish`, data);
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