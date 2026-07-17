
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface DeleteUserRequestDTO {
  userId: string
}

interface DeleteUserResponseDTO {
  id: string
}

export const DeleteUser = async (data: DeleteUserRequestDTO): Promise<ResponseApi<DeleteUserResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/user/${data.userId}`);
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