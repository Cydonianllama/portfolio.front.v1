/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { CreateMemberRequestDTO, CreateMemberResponseDTO } from '../models/dto';

export const CreateMember = async (config: CreateMemberRequestDTO): Promise<ResponseApi<CreateMemberResponseDTO> | null>  => {
  try {
    const req = await api.post(`/api/backoffice/workspaces/${config.workspaceId}/members`, {
      email: config.email,
      rolId: config.rolId,
    })
    return req.data;
  } catch (ex) {
    return null;
  }
}
