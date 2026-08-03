import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { GetTagsRequestDTO, GetTagsResponseDTO } from './tags.dto';

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
