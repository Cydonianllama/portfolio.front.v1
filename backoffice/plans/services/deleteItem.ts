/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { PlanDTO } from '../models/dto';
import { DeletePlanRequestDTO, DeletePlanResponseDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const DeletePlanService = async (config: DeletePlanRequestDTO): Promise<ResponseApi<DeletePlanResponseDTO> | null>  => {
  try {
    const req = await api.delete(`${configurationModule.mainAPIroute}/${config.id}`)
    return req.data;
  } catch (ex) {
    return null;
  }
}