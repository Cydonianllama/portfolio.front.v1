import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { CreateTagRequestDTO, CreateTagResponseDTO, DeleteTagRequestDTO, DeleteTagResponseDTO, GetTagsRequestDTO, GetTagsResponseDTO, UpdateTagRequestDTO, UpdateTagResponseDTO } from './tags.dto';

export const GetTags = async (data: GetTagsRequestDTO): Promise<ResponseApi<GetTagsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/workspaces/${data.workspaceId}/tags?page=${data.page}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      return ex.response?.data ?? null;
    }
    return null
  }
}


export const UpdateTag = async (id: string, data: UpdateTagRequestDTO): Promise<ResponseApi<UpdateTagResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/workspaces/${data.workspaceId}/tags/${id}`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}

export const CreateTag = async (data: CreateTagRequestDTO): Promise<ResponseApi<CreateTagResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/workspaces/${data.workspaceId}/tags`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}

export const DeleteTag = async (data: DeleteTagRequestDTO): Promise<ResponseApi<DeleteTagResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/workspaces/${data.workspaceId}/tags/${data.id}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}
