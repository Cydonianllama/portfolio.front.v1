/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { DeleteMemberRequestDTO, DeleteMemberResponseDTO } from '../models/dto';

export const DeleteMember = async (config: DeleteMemberRequestDTO): Promise<ResponseApi<DeleteMemberResponseDTO> | null>  => {
  try {
    const req = await api.delete(`/api/backoffice/workspaces/${config.workspaceId}/members/${config.memberId}`)
    return req.data;
  } catch (ex) {
    return null;
  }
}
