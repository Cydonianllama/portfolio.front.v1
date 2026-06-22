/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ContactDTO } from '../models/dto';
import { CreateContactRequestDTO, CreateContactResponseDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';


export const CreateContactService = async (config: CreateContactRequestDTO): Promise<ResponseApi<CreateContactResponseDTO> | null> => {
  try {
    const req = await api.post(`${configurationModule.mainAPIroute}`, config)
    return req.data;
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
