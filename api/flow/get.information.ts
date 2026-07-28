
// ______________ Service
import { IAutomation, IAutomationNode, IPublishedAutomation, Trigger } from '@erick/conversationalflow';

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface GetAutomationInformationRequestDTO {
  automationId: string
}

interface GetAutomationInformationResponseDTO {
  publishedAutomation?: IPublishedAutomation
  automation?: IAutomation,
  nodeList?: Array<IAutomationNode>,
  triggers?: Array<Trigger>
}

export const GetAutomationInformation = async (data: GetAutomationInformationRequestDTO): Promise<ResponseApi<GetAutomationInformationResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/flows/${data.automationId}`);
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