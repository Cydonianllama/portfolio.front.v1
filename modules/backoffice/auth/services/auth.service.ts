import axios from 'axios';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';

import Cookies from "js-cookie";
import { loginResponseData } from '../models/login.response';

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


export const logoutBackoffice = async (): Promise<boolean> => {
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