/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { GetContactsResponseDTO, ContactDTO } from '../models/dto';
import { GetContactsRequestDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const GetContactsService = async (config: GetContactsRequestDTO): Promise<ResponseApi<GetContactsResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}?page=${config.page}&query=${config.query}`)
    return req.data;
  } catch {
    return null;
  }
};
