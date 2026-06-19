/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '@/modules/examples/example1/types/manager.v1';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { UpdateItemRequestDTO, UpdateUserResponseDTO } from '../models/dto';

export const UpdateItem = async (config: UpdateItemRequestDTO): Promise<ResponseApi<UpdateUserResponseDTO> | null>  => {
  try {
    const req = await api.put(`/api/backoffice/users/${config.id}`, config)
    return req.data;
  } catch (ex) {
    return null;
  }
}



