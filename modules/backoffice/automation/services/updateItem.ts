/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { UpdateAutomationResponseDTO, UpdateItemRequestDTO } from '../models/dto';
import { api } from '@/setup/axios'


export const UpdateItem = async (config: UpdateItemRequestDTO): Promise<ResponseApi<UpdateAutomationResponseDTO> | null>  => {
  try {
    const req = await api.put(`/api/backoffice/automations/${config.id}`, config);
    return req.data;
  } catch (ex) {
    return null;
  }
}