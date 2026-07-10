import { api } from '@/setup/axios'
import { ResponseApi } from "@/types/api/response";
import { ListWorkspacesUserDto, ListWorkspacesUserResponseDto, UpdateUserRequestDTO, UpdateUserResponse } from "./user.dto";
import { FieldToArray } from '@/types/types';


export const ListWorkspacesUser = async (data: ListWorkspacesUserDto): Promise<ResponseApi<ListWorkspacesUserResponseDto> | null> => {
  try {
    const req = await api.get<ResponseApi<ListWorkspacesUserResponseDto>>(`/api/users/${data.userId}/workspaces`);
    return req.data;
  } catch (err) {
    return null;
  }
}

export const UpdateUser = async (id: string, data: FieldToArray<UpdateUserRequestDTO>[]): Promise<ResponseApi<UpdateUserResponse> | null> => {
  try {
    const jsonToSend: Partial<UpdateUserRequestDTO> = {};
    for (const field of data) {
      jsonToSend[field.param] = field.value;
    }
    const req = await api.put(`/api/users/${id}`, jsonToSend);
    return req.data;
  } catch (err) {
    return null;
  }
}
