/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '@/modules/examples/example1/types/manager.v1';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { CreateItemRequestDTO, CreateWorkspaceResponseDTO } from '../models/dto';

export const CreateItem = async (config: CreateItemRequestDTO): Promise<ResponseApi<CreateWorkspaceResponseDTO> | null>  => {
  try {
    const req = await api.post(`/api/backoffice/workspaces`, config)
    return req.data;
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
