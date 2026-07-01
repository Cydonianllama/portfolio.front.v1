/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';
import { GetPopularPlansResponseDTO } from '../models/dto';

export const GetPopularPlansService = async (): Promise<ResponseApi<GetPopularPlansResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}/popular-plans`)
    return req.data;
  } catch {
    return null;
  }
};
