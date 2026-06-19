/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '@/modules/examples/example1/types/manager.v1';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { UpateWorkspaceResponseDTO, UpdateItemRequestDTO } from '../models/dto';

export const UpdateItem = async (config: UpdateItemRequestDTO): Promise<ResponseApi<UpateWorkspaceResponseDTO> | null>  => {
  try {
    const req = await api.put(`/api/backoffice/workspaces/${config.id}`, config)
    return req.data;
  } catch (ex) {
    return null;
  }
}



