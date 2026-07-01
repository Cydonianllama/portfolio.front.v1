/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';
import { GetConversionResponseDTO } from '../models/dto';

export const GetConversionService = async (): Promise<ResponseApi<GetConversionResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}/conversion`)
    return req.data;
  } catch {
    return null;
  }
};
