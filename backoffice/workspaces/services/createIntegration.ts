/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { CreateIntegrationRequestDTO, CreateIntegrationResponseDTO } from '../models/dto';

export const CreateIntegration = async (config: CreateIntegrationRequestDTO): Promise<ResponseApi<CreateIntegrationResponseDTO> | null>  => {
  try {
    const req = await api.post(`/api/backoffice/integrations`, config)
    return req.data;
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
