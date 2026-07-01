/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';
import { GetRecentActivitiesResponseDTO } from '../models/dto';

export const GetRecentActivitiesService = async (): Promise<ResponseApi<GetRecentActivitiesResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}/recent-activities`)
    return req.data;
  } catch {
    return null;
  }
};
