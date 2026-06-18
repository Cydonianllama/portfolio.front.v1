"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';

export interface GetUsersConfig {
  query: string;
  page: number;
}

export const GetUsers = async (config: GetUsersConfig) : Promise<ResponseApi<any> | null>  =>  {
  try {
    console.log('GetUsers')
    const req = await api.get<ResponseApi<any>>(`/api/backoffice/users?page=${config.page}`);
    const res = req.data;
    return res
  } catch (error) {
    console.log('GetUsers error')
    return null;
  }
}