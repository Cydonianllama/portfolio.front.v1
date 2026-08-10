/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { DeleteWidgetRequestDTO, DeleteWidgetResponseDTO } from '../models/dto';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const DeleteWidgetService = async (config: DeleteWidgetRequestDTO): Promise<ResponseApi<DeleteWidgetResponseDTO> | null>  => {
  try {
    const req = await api.delete(`${configurationModule.mainAPIroute}/${config.id}`)
    return req.data;
  } catch {
    return null;
  }
}
