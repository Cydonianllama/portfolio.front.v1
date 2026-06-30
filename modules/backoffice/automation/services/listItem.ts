/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { GetAutomationsResponseDTO, GetItemsRequestDTO } from '../models/dto';
import { api } from '@/setup/axios'


export const GetItems = async (config: GetItemsRequestDTO): Promise<ResponseApi<GetAutomationsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/backoffice/automations?page=${config.page}&query=${config.query}`);
    return req.data;
  } catch {
    return null;
  }
};
