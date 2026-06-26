"use client"

import { GetUserResponseDTO, GetUsersRequestDTO } from '@/models/user.dto';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';


export const GetUsers = async (config: GetUsersRequestDTO) : Promise<ResponseApi<GetUserResponseDTO> | null>  =>  {
  try {
    const req = await api.get(`/api/backoffice/users?page=${config.page}&query=${config.query}`);
    const res = req.data;
    return res
  } catch (error) {
    return null;
  }
}