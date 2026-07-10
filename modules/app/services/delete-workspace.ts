import axios from 'axios';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { DeleteWorkspace } from '@/api/workspace/workspace.api';
import { DeleteWorkspaceDto, DeleteWorkspaceResponseDto } from '@/api/workspace/workspace.dto';

export const DeleteWorkspaceService = async (data: DeleteWorkspaceDto) : Promise<ResponseApi<DeleteWorkspaceResponseDto> | null> => {
  try{
    const req = await DeleteWorkspace(data);
    return req;
  } catch (err) {
    return null;
  }
}