/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from "@/types/api/response";
import { ListWorkspacesUserDto, ListWorkspacesUserResponseDto } from "./user.dto";

export const ListWorkspacesUser = async (data: ListWorkspacesUserDto) : Promise<ResponseApi<ListWorkspacesUserResponseDto> | null> => {
  try{
    const req = await api.get<ResponseApi<ListWorkspacesUserResponseDto>>(`/api/users/${data.userId}/workspaces`);
    return req.data;
  } catch (err) {
    return null;
  }
}