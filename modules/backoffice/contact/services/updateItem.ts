/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ContactDTO, UpdateContactRepsonseDTO } from '../models/dto';
import { UpdateContactRequestDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const UpdateContactService = async (config: UpdateContactRequestDTO): Promise<ResponseApi<UpdateContactRepsonseDTO> | null> => {
  try {
    const req = await api.put(`${configurationModule.mainAPIroute}/${config.id}`, config)
    return req.data;
  } catch (ex) {
    return null;
  }
}



