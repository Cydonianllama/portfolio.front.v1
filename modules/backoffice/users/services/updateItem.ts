/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { UpdateItemRequestDTO, UpdatePasswordRequestDTO, UpdateUserPasswordResponseDTO, UpdateUserResponseDTO } from '../models/dto';

export const UpdateItem = async (config: UpdateItemRequestDTO): Promise<ResponseApi<UpdateUserResponseDTO> | null>  => {
  try {
    const req = await api.put(`/api/backoffice/users/${config.id}`, config)
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const UpdatePassword = async (config: UpdatePasswordRequestDTO): Promise<ResponseApi<UpdateUserPasswordResponseDTO> | null>  => {
  try {
    const req = await api.put(`/api/backoffice/users/${config.id}/password`, {
      password: config.password
    })
    return req.data;
  } catch (ex) {
    return null;
  }
}


