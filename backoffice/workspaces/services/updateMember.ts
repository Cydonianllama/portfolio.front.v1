/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { UpdateMemberRequestDTO, UpdateMemberResponseDTO } from '../models/dto';

export const UpdateMember = async (config: UpdateMemberRequestDTO): Promise<ResponseApi<UpdateMemberResponseDTO> | null>  => {
  try {
    const req = await api.put(`/api/backoffice/workspaces/${config.workspaceId}/members/${config.memberId}`, {
      email: config.email,
      status: config.status,
      rolId: config.rolId,
      invitationAccepted: config.invitationAccepted,
      invitationAcceptedDate: config.invitationAcceptedDate,
    })
    return req.data;
  } catch (ex) {
    return null;
  }
}
