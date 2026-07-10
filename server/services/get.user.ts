'use server'

import { GetUserInformationResponse } from "@/api/user/user.dto"
import { ResponseApi } from "@/types/api/response"
import axios from "axios";

export const GetUser = async (token: string): Promise<ResponseApi<GetUserInformationResponse> | null> => {
  try {
    const req = await axios.get<ResponseApi<GetUserInformationResponse>>(`${process.env.API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return req.data
  } catch (ex) {
    return null;
  }
}