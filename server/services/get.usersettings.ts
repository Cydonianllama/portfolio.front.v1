'use server'

import { GetUserSettingsRequestDTO, GetUserSettingsResponseDTO } from "@/api/settings/get.usersettings";
import { ResponseApi } from "@/types/api/response"
import axios from "axios";

export const GetUserSettings = async (token: string, data: GetUserSettingsRequestDTO): Promise<ResponseApi<GetUserSettingsResponseDTO> | null> => {
  try {
    const req = await axios.get<ResponseApi<GetUserSettingsResponseDTO>>(`${process.env.API_URL}/api/settings/user?userId=${data.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return req.data
  } catch (ex) {
    return null;
  }
}