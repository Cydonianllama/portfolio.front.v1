/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { CreateIntegrationRequestDTO, CreateIntegrationResponseDTO, DeleteIntegrationRequestDTO, DeleteIntegrationResponseDTO } from '../models/dto';

export const DeleteIntegration = async (config: DeleteIntegrationRequestDTO): Promise<ResponseApi<DeleteIntegrationResponseDTO> | null>  => {
  try {
    const req = await api.delete(`/api/backoffice/integrations/${config.id}`)
    return req.data;
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
