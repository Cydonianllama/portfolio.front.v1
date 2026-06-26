/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { PlanDTO } from '../models/dto';
import { CreatePlanRequestDTO, CreatePlanResponseDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';


export const CreatePlanService = async (config: CreatePlanRequestDTO): Promise<ResponseApi<CreatePlanResponseDTO> | null> => {
  try {
    const req = await api.post(`${configurationModule.mainAPIroute}`, config)
    return req.data;
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
