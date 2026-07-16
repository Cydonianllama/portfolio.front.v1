
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { ActivityDTO } from './dto';

export interface ListActivitiesRequestDTO {
  workspaceId: string
}

interface ListActivitiesResponseDTO {
  list: Array<ActivityDTO>
}

export const ListActivities= async (data: ListActivitiesRequestDTO): Promise<ResponseApi<ListActivitiesResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/activities?workspaceId=${data.workspaceId}`);
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