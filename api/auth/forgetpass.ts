import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

interface ForgetPasswordRequestDTO {
  email: string
}

interface ForgetPasswordResponseDTO {
  
}

export const ForgetPassword= async (data: ForgetPasswordRequestDTO): Promise<ResponseApi<ForgetPasswordResponseDTO> | null> => {
  try {
    const req = await api.post(`/auth/forget-pass`, data);
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