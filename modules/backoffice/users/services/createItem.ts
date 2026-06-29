/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';

import { api } from '@/setup/axios'
import { CreateItemRequestDTO, CreateUserResponseDTO } from '../models/dto';

export const CreateItem = async (config: CreateItemRequestDTO): Promise<ResponseApi<CreateUserResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/backoffice/users`, config)
    return req.data;
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
