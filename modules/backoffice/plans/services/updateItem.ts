/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { PlanDTO, UpdatePlanRepsonseDTO } from '../models/dto';
import { UpdatePlanRequestDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const UpdatePlanService = async (config: UpdatePlanRequestDTO): Promise<ResponseApi<UpdatePlanRepsonseDTO> | null> => {
  try {
    const req = await api.put(`${configurationModule.mainAPIroute}/${config.id}`, config)
    return req.data;
  } catch (ex) {
    return null;
  }
}



