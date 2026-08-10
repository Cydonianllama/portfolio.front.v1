/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { FieldToArray } from '@/types/types';
import { CreateWorkspaceDto, CreateWorkspaceResponseDto, DeleteWorkspaceDto, DeleteWorkspaceResponseDto, UpdateWorkspaceRequestDTO, UpdateWorkspaceResponseDTO } from './workspace.dto';

export const UpdateWorkspace = async (id: string, data: FieldToArray<UpdateWorkspaceRequestDTO>[]): Promise<ResponseApi<UpdateWorkspaceResponseDTO> | null> => {
  try {
      const jsonToSend: Partial<UpdateWorkspaceRequestDTO> = {};
      for (const field of data) {
        jsonToSend[field.param] = field.value;
      }

      const req = await api.put(`/api/workspaces/${id}`, jsonToSend)
      return req.data;
  } catch (ex) {
    return null;
  }
}

export const CreateWorkspace= async (data: CreateWorkspaceDto) : Promise<ResponseApi<CreateWorkspaceResponseDto> | null> => {
  try{
    const req = await api.post<ResponseApi<CreateWorkspaceResponseDto>>(`/api/workspaces`, data);
    return req.data;
  } catch (err) {
    return null;
  }
}

export const DeleteWorkspace = async (data: DeleteWorkspaceDto) : Promise<ResponseApi<DeleteWorkspaceResponseDto> | null> => {
  try{
    const req = await api.delete<ResponseApi<DeleteWorkspaceResponseDto>>(`/api/workspaces/${data.workspaceId}`);
    return req.data;
  } catch (err) {
    return null;
  }
}

export const ReorderWorkspaces = async (userId: string, orderedWorkspaceIds: string[]) : Promise<ResponseApi<any> | null> => {
  try{
    const req = await api.put(`/api/users/${userId}/workspaces/reorder`, { orderedWorkspaceIds });
    return req.data;
  } catch (err) {
    return null;
  }
}

