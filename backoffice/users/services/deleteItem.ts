/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';

import { api } from '@/setup/axios'
import { DeleteItemRequestDTO, DeleteUserResponseDTO } from '../models/dto';

export const DeleteItem = async (config: DeleteItemRequestDTO): Promise<ResponseApi<DeleteUserResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/backoffice/users/${config.id}`)
    return req.data;
  } catch (ex) {
    return null;
  }
}