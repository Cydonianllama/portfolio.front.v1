/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';
import { GetUserStatusResponseDTO } from '../models/dto';

export const GetUserStatusService = async (): Promise<ResponseApi<GetUserStatusResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}/user-status`)
    return req.data;
  } catch {
    return null;
  }
};
