/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { GetItemsRequestDTO, GetUsersResponseDTO } from '../models/dto';


export const GetItems = async (config: GetItemsRequestDTO): Promise<ResponseApi<GetUsersResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/backoffice/users?page=${config.page}&query=${config.query}`)
    return req.data;
  } catch {
    return null;
  }
};
