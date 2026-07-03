/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseApi } from "@/types/api/response";
import axios from 'axios';
import { UserInfoResponseDto } from "../dto/dtos";

export const GetUserInfoService = async (token: string): Promise<ResponseApi<UserInfoResponseDto> | null> => {
  try {
    console.log(process.env.API_URL)
    console.log(token)
    const req = await axios.get<ResponseApi<UserInfoResponseDto>>(`${process.env.API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return req.data
  } catch (err: any) {
    return {
      status: false,
      message: err.message || '',
      data: {
        user: {
          email: '',
          id: '',
          name: ''
        }
      }
    };
  }
}