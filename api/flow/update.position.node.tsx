
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { IAutomationNode } from '@erick/conversationalflow';

export interface UpdatePositionNodeRequestDTO {
  nodeId: string,
  x: number,
  y: number
}

interface UpdatePositionNodeResponseDTO {
  node: IAutomationNode | null
}

export const UpdatePositionNode = async (data: UpdatePositionNodeRequestDTO): Promise<ResponseApi<UpdatePositionNodeResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/flows/node/position`, data);
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