/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { UpdateWidgetRequestDTO, UpdateWidgetResponseDTO } from '../models/dto';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const UpdateWidgetService = async (config: UpdateWidgetRequestDTO): Promise<ResponseApi<UpdateWidgetResponseDTO> | null> => {
  try {
    const req = await api.put(`${configurationModule.mainAPIroute}/${config.id}`, config)
    return req.data;
  } catch {
    return null;
  }
}
