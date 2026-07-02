/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { GetWorkspacesRequestDTO, GetWorkspacesResponseDTO } from '../models/dto';

export const GetWorkspaces = async (config: GetWorkspacesRequestDTO): Promise<ResponseApi<GetWorkspacesResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/backoffice/workspaces?page=${config.page}&query=${config.query}`)
    return req.data;
  } catch {
    return null;
  }
};
