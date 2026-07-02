/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { GetMembersRequestDTO, GetMembersResponseDTO } from '../models/dto';

export const GetMembers = async (config: GetMembersRequestDTO): Promise<ResponseApi<GetMembersResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/backoffice/workspaces/${config.workspaceId}/members?page=${config.page}&limit=20`)
    return req.data;
  } catch {
    return null;
  }
};
