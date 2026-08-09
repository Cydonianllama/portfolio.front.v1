
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { UserDTO } from '@/api/user/user.dto';
import axios from "axios"

interface RegisterUserRequestDTO {
  email: string;
  password: string;
  fullname: string;
}

export interface RegisterUserResponseDTO {
  token: string | null
  userData: UserDTO | null
}

export const RegisterUser = async (data: RegisterUserRequestDTO): Promise<ResponseApi<RegisterUserResponseDTO> | null> => {
  try {
    const req = await api.post(`/auth/register`, data);
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
