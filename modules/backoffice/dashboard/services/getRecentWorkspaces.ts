/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';
import { GetRecentWorkspacesResponseDTO } from '../models/dto';

export const GetRecentWorkspacesService = async (): Promise<ResponseApi<GetRecentWorkspacesResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}/recent-workspaces`)
    return req.data;
  } catch {
    return null;
  }
};
