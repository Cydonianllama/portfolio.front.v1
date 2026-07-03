import axios from 'axios';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { CreateWorkspaceResponseDto } from '../dto/dtos';
import { CreateWorkspaceDto } from '../dto/dtos';

export const CreateWorkspaceService = async (data: CreateWorkspaceDto) : Promise<ResponseApi<CreateWorkspaceResponseDto> | null> => {
  try{
    const req = await api.post<ResponseApi<CreateWorkspaceResponseDto>>(`/api/workspaces`, data);
    return req.data;
  } catch (err) {
    return null;
  }
}