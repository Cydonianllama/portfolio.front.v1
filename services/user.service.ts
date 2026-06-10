/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';


export interface GetUsersConfig {
  query: string;
  page: number;
}

export const GetUsers = async (config: GetUsersConfig) : Promise<ResponseApi<any> | null>  =>  {
  try {
    const req = await api.get<ResponseApi<any>>(``);
    const res = req.data;
    return res
  } catch (error) {
    return null;
  }
}