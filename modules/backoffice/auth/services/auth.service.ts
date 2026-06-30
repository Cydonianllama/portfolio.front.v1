import axios from 'axios';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { loginResponseData } from '@/types/auth/login.response';

export const loginBackoffice = async (
  username: string,
  password: string
): Promise<ResponseApi<loginResponseData> | null> => {
  try {
    const req = await api.post<ResponseApi<loginResponseData>>(`/back-office/login`, {
      email: username,
      password
    })

    return req.data;
  } catch (error) {
    if (axios.isAxiosError<ResponseApi<loginResponseData>>(error)) {
      return error.response?.data || null;
    }

    return null;
  }
}
