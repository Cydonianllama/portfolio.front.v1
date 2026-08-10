/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { CreateWidgetRequestDTO, CreateWidgetResponseDTO } from '../models/dto';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const CreateWidgetService = async (config: CreateWidgetRequestDTO): Promise<ResponseApi<CreateWidgetResponseDTO> | null> => {
  try {
    const req = await api.post(`${configurationModule.mainAPIroute}`, config)
    return req.data;
  } catch {
    return null;
  }
}
