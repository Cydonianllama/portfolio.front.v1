/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { GetUserResponseDTO } from '../models/dto';

export interface AssignPlanRequestDTO {
  userId: string;
  planId: string;
}

export interface UpdatePlanRequestDTO {
  userId: string;
  planId: string;
}

export interface RemovePlanRequestDTO {
  userId: string;
}

export const AssignPlanService = async (config: AssignPlanRequestDTO): Promise<ResponseApi<GetUserResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/backoffice/users/${config.userId}/plan`, { planId: config.planId })
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const UpdatePlanService = async (config: UpdatePlanRequestDTO): Promise<ResponseApi<GetUserResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/backoffice/users/${config.userId}/plan`, { planId: config.planId })
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const RemovePlanService = async (config: RemovePlanRequestDTO): Promise<ResponseApi<GetUserResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/backoffice/users/${config.userId}/plan`)
    return req.data;
  } catch (ex) {
    return null;
  }
}
