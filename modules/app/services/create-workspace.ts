import axios from 'axios';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { CreateWorkspace } from '@/api/workspace/workspace.api';
import { CreateWorkspaceDto, CreateWorkspaceResponseDto } from '@/api/workspace/workspace.dto';

export const CreateWorkspaceService = async (data: CreateWorkspaceDto) : Promise<ResponseApi<CreateWorkspaceResponseDto> | null> => {
  try{
    const req = await CreateWorkspace(data);
    return req;
  } catch (err) {
    return null;
  }
}