/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '@/modules/examples/example1/types/manager.v1';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { GetItemsRequestDTO, GetWorkspacesResponseDTO } from '../models/dto';

export const GetItems = async (config: GetItemsRequestDTO): Promise<ResponseApi<GetWorkspacesResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/backoffice/workspaces?page=${config.page}&query=${config.query}`)
    return req.data;
  } catch {
    return null;
  }
};
