import axios from 'axios';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ListWorkspacesUserDto, ListWorkspacesUserResponseDto } from '../dto/dtos';

export const ListWorkspacesUserService = async (data: ListWorkspacesUserDto) : Promise<ResponseApi<ListWorkspacesUserResponseDto> | null> => {
  try{
    return null;
  } catch (err) {
    return null;
  }
}