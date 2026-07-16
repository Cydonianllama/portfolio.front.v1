/* eslint-disable @typescript-eslint/no-explicit-any */

// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface GetSubscriptionRequestDTO {
  workspaceId: string
}

interface GetSubscriptionResponseDTO {
  subscription: any
}

export const GetSubscription= async (data: GetSubscriptionRequestDTO): Promise<ResponseApi<GetSubscriptionResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/workspace/${data.workspaceId}/subscriptions/`);
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