/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ContactDTO } from '../models/dto';
import { DeleteContactRequestDTO, DeleteContactResponseDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const DeleteContactService = async (config: DeleteContactRequestDTO): Promise<ResponseApi<DeleteContactResponseDTO> | null>  => {
  try {
    const req = await api.delete(`${configurationModule.mainAPIroute}/${config.id}`)
    return req.data;
    
  } catch (ex) {
    return null;
  }
}