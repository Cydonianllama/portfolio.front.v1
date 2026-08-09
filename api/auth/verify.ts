import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from "axios"

interface VerifyAccountRequestDTO {
  opt: string
}

interface VerifyAccountResponseDTO {
  token: string
}

export const VerifyAccount= async (data: VerifyAccountRequestDTO): Promise<ResponseApi<VerifyAccountResponseDTO> | null> => {
  try {
    const req = await api.post(`/auth/verify`, data);
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