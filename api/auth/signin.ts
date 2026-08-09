import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from "axios"

export type loginResponseData = {
  token: string
}

export const Login = async (username: string, password: string) : Promise<ResponseApi<loginResponseData> | null>  => {
  try {
    const req = await api.post<ResponseApi<loginResponseData>>(`/auth/login`, { email: username, password })
    const data = req.data;
    return data;
  } catch (ex) {
    if (axios.isAxiosError<ResponseApi<loginResponseData>>(ex)) {
      return ex.response?.data ?? null;;
    }
    return null;
  }
}
