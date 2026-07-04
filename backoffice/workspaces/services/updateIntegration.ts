/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { UpdateIntegrationRequestDTO, UpdateIntegrationResponseDTO } from '../models/dto';

export const UpdateIntegration = async (config: UpdateIntegrationRequestDTO): Promise<ResponseApi<UpdateIntegrationResponseDTO> | null>  => {
  try {
    const req = await api.put(`/api/backoffice/integrations/${config.id}`, config)
    return req.data;
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
