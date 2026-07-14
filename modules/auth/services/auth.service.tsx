/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { loginResponseData } from '@/modules/auth/models/login.response';
import { UserDTO } from '@/api/user/user.dto';
import axios from "axios"
import Cookies from "js-cookie";

export const Login = async (username: string, password: string) : Promise<ResponseApi<loginResponseData> | null>  => {
  try {
    const req = await api.post<ResponseApi<loginResponseData>>(`/auth/login`, { email: username, password })
    const data = req.data;
    return data;
  } catch (ex) {
    return null;
  }
}

export const Logout = async (): Promise<boolean> => {
  try {
    // const req = await api.post<ResponseApi<null>>(`/back-office/logout`);
    // return req.data;
    localStorage.removeItem("token");
    Cookies.remove("token");

    return true

  } catch (error) {
    if (axios.isAxiosError<ResponseApi<null>>(error)) {
      return false;
    }
    return false;
  }
}

interface RegisterUserRequestDTO {
  email: string;
  password: string;
  fullname: string;
}

interface RegisterUserResponseDTO {
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


// ______________ Service
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