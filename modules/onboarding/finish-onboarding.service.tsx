
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

interface FinishOnboardingRequestDTO {
  nameWorkspace: string
  rol: string
  industry: string
  qtyTeam: string
}

interface FinishOnboardingResponseDTO {
  list: Array<{ id: string, name: string }>
}

export const FinishOnboarding = async (data: FinishOnboardingRequestDTO): Promise<ResponseApi<FinishOnboardingResponseDTO> | null> => {
  try {
    const req = await api.post(`/onboarding/finish`, data);
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