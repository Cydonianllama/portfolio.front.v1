/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { GetWidgetsResponseDTO } from '../models/dto';
import { GetWidgetsRequestDTO } from '../models/dto';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const GetWidgetsService = async (config: GetWidgetsRequestDTO): Promise<ResponseApi<GetWidgetsResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}?workspaceId=${config.workspaceId}&page=${config.page}&query=${config.query}`)
    return req.data;
  } catch {
    return null;
  }
};
