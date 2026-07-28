
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { IUserSettings } from '../user/user.settings';

export interface GetUserSettingsRequestDTO {
  userId: string
}

export interface GetUserSettingsResponseDTO {
  setting: IUserSettings
}

export const GetUserSettings = async (data: GetUserSettingsRequestDTO): Promise<ResponseApi<GetUserSettingsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/settings/user?userId=${data.userId}`);
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