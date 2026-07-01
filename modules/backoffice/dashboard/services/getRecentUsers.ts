/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';
import { GetRecentUsersResponseDTO } from '../models/dto';

export const GetRecentUsersService = async (): Promise<ResponseApi<GetRecentUsersResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}/recent-users`)
    return req.data;
  } catch {
    return null;
  }
};
