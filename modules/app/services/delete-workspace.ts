import axios from 'axios';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { DeleteWorkspaceDto, DeleteWorkspaceResponseDto } from '../dto/dtos';

export const DeleteWorkspaceService = async (data: DeleteWorkspaceDto) : Promise<ResponseApi<DeleteWorkspaceResponseDto> | null> => {
  try{
    const req = await api.delete<ResponseApi<DeleteWorkspaceResponseDto>>(`/api/workspaces/${data.workspaceId}`);
    return req.data;
  } catch (err) {
    return null;
  }
}