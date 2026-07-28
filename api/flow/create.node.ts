/* eslint-disable @typescript-eslint/no-explicit-any */

// ______________ Service
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { IAutomationNode, NodeTypesType } from '@erick/conversationalflow';
import axios from 'axios'

export interface CreateNodeRequestDTO {
  id: string,
  automationId: string,
  nodeType: NodeTypesType,
  x: number,
  y: number,
}

interface CreateNodeResponseDTO {
  node: IAutomationNode | null
}

export const CreateNode= async (data: CreateNodeRequestDTO): Promise<ResponseApi<CreateNodeResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/flows/create-node`, data);
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