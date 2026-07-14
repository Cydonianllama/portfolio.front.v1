
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

interface ChangePasswordRequestDTO {
  validationCode: string;
  password: string;
}

interface ChangePasswordResponseDTO {
  list: Array<{ id: string, name: string }>
}

export const ChangePassword= async (data: ChangePasswordRequestDTO): Promise<ResponseApi<ChangePasswordResponseDTO> | null> => {
  try {
    const req = await api.put(`/auth/change-password`, data);
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