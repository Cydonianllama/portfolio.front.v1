/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { loginResponseData } from '@/modules/auth/models/login.response';

export const Login = async (username: string, password: string) : Promise<ResponseApi<loginResponseData> | null>  => {
  try {
    const req = await api.post<ResponseApi<loginResponseData>>(`/auth/login`, { email: username, password })
    const data = req.data;
    return data;
  } catch (ex) {
    return null;
  }
}

import Cookies from "js-cookie";
export const Logout = async (): Promise<boolean> => {
  try {
    // const req = await api.post<ResponseApi<null>>(`/back-office/logout`);
    // return req.data;
    localStorage.removeItem("token");
    Cookies.remove("token");

    return true

  } catch (error) {
    // if (axios.isAxiosError<ResponseApi<null>>(error)) {
    //   return error.response?.data || null;
    // }
    return false;
  }
}