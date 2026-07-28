'use server'
import { GeyWorkspaceSettingsRequestDTO, GeyWorkspaceSettingsResponseDTO } from "@/api/settings/get.workspacesettings";
import { ResponseApi } from "@/types/api/response"
import axios from "axios";

export const GetWorkspaceSettings = async (token: string, data: GeyWorkspaceSettingsRequestDTO): Promise<ResponseApi<GeyWorkspaceSettingsResponseDTO> | null> => {
  try {
    const req = await axios.get<ResponseApi<GeyWorkspaceSettingsResponseDTO>>(`${process.env.API_URL}/api/settings/workspace?workspaceId=${data.workspaceId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return req.data
  } catch (ex) {
    return null;
  }
}