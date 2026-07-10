'use server'

import { ListWorkspacesUserDto, ListWorkspacesUserResponseDto } from "@/modules/app/dto/dtos";
import { ResponseApi } from "@/types/api/response";
import axios from "axios";

export const GetUserWorkspaces = async (token: string, data: ListWorkspacesUserDto) : Promise<ResponseApi<ListWorkspacesUserResponseDto> | null>  => {
  try {
    const req = await axios.get<ResponseApi<ListWorkspacesUserResponseDto>>(`${process.env.API_URL}/api/users/${data.userId}/workspaces`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return req.data
  } catch (ex) {
    return null;
  }
}