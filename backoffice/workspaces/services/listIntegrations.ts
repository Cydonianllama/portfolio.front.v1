/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { GetIntegrationsRequestDTO, GetIntegrationsResponseDTO } from '../models/dto';

export const GetIntegrations = async (config: GetIntegrationsRequestDTO): Promise<ResponseApi<GetIntegrationsResponseDTO> | null>  => {
  try {
    const req = await api.get(`/api/backoffice/integrations?page=${config.page}&workspaceId=${config.workspaceId}`)
    return req.data;
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
