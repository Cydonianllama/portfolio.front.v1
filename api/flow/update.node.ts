/* eslint-disable @typescript-eslint/no-explicit-any */

// ______________ Service
import { IAutomationNode } from '@erick/conversationalflow';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface UpdateNodeRequestDTO {
  id: string,
  title?: string,
  configuration: any
}

interface UpdateNodeResponseDTO {
  node: IAutomationNode | null
}

export const UpdateNode = async (data: UpdateNodeRequestDTO): Promise<ResponseApi<UpdateNodeResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/flows/node`, data);
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