import axios from 'axios';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ListWorkspacesUser } from '@/api/user/user.api';
import { ListWorkspacesUserDto, ListWorkspacesUserResponseDto } from '@/api/user/user.dto';

export const ListWorkspacesUserService = async (data: ListWorkspacesUserDto) : Promise<ResponseApi<ListWorkspacesUserResponseDto> | null> => {
  try{
    const req = await ListWorkspacesUser(data);
    return req;
  } catch (err) {
    return null;
  }
}