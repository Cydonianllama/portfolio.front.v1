/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';
import { GetGrowthResponseDTO } from '../models/dto';

export const GetGrowthService = async (
  metric: 'users' | 'plans' | 'workspaces',
  period: string
): Promise<ResponseApi<GetGrowthResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}/growth?metric=${metric}&period=${period}`)
    return req.data;
  } catch {
    return null;
  }
};
