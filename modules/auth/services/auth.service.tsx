/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { loginResponseData } from '@/types/auth/login.response';

export const Login = async (username: string, password: string) : Promise<ResponseApi<loginResponseData> | null>  => {
  try {
    const req = await api.post<ResponseApi<loginResponseData>>(`/auth/login`, { email: username, password })
    const data = req.data;
    return data;
  } catch (ex) {
    return null;
  }
}