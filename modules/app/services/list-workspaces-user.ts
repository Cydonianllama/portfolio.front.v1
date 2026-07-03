import axios from 'axios';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ListWorkspacesUserDto, ListWorkspacesUserResponseDto } from '../dto/dtos';

export const ListWorkspacesUserService = async (data: ListWorkspacesUserDto) : Promise<ResponseApi<ListWorkspacesUserResponseDto> | null> => {
  try{
    const req = await api.get<ResponseApi<ListWorkspacesUserResponseDto>>(`/api/users/${data.userId}/workspaces`);
    return req.data;
  } catch (err) {
    return null;
  }
}