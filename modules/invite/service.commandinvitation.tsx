
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

interface CommandInvitationRequestDTO {
  action: string
  invitationId: string
}

interface CommandInvitationResponseDTO {
  list: Array<{ id: string, name: string }>
}

export const CommandInvitation = async (data: CommandInvitationRequestDTO): Promise<ResponseApi<CommandInvitationResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/invitations/command`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}