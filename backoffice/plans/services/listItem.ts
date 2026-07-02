/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { GetPlansResponseDTO, PlanDTO } from '../models/dto';
import { GetPlanRequestDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const GetPlanService = async (config: GetPlanRequestDTO): Promise<ResponseApi<GetPlansResponseDTO> | null> => {
  try {
    const req = await api.get(`${configurationModule.mainAPIroute}?query=${config.query}&page=${config.page}`)
    return req.data;
  } catch {
    return null;
  }
};
