/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';
import { GetKpisResponseDTO } from '../models/dto';

export const GetKpisService = async (): Promise<ResponseApi<GetKpisResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}/kpis`)
    return req.data;
  } catch {
    return null;
  }
};
