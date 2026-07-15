
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

interface GetInvitationInformationRequestDTO {
  invitationId: string
  tokenUser: string
}

export interface GetInvitationInformationResponseDTO {
  workspaceFromInvitation?: {
    name: string
    id: string
  },
  invitation?: {
    id: string
    email: string
  },
  forceRegister?: boolean;
}

export const GetInvitationInformation = async (data: GetInvitationInformationRequestDTO): Promise<ResponseApi<GetInvitationInformationResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/invitations?invitationId=${data.invitationId}&tokenUser=${data.tokenUser}`);
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