
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { IWorkspaceSettings } from '../workspace/workspace.settings';

export interface GeyWorkspaceSettingsRequestDTO {
  workspaceId: string
}

export interface GeyWorkspaceSettingsResponseDTO {
  setting: IWorkspaceSettings
}

export const GeyWorkspaceSettings = async (data: GeyWorkspaceSettingsRequestDTO): Promise<ResponseApi<GeyWorkspaceSettingsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/settings/workspace?workspaceId=${data.workspaceId}`);
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