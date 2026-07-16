/* eslint-disable @typescript-eslint/no-explicit-any */

// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface GetInvoicesRequestDTO {
  workspaceId: string
  page: number
}

interface GetInvoicesResponseDTO {
  list: Array<any>
}

export const GetInvoices= async (data: GetInvoicesRequestDTO): Promise<ResponseApi<GetInvoicesResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/workspaces/${data.workspaceId}/invoices?page=${data.page}`);
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