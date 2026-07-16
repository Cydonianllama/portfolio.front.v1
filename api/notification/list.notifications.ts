
// ______________ Service

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { NotificationDTO } from './dto';

export interface ListNotificationsRequestDTO {
  userId: string
}

interface ListNotificationsResponseDTO {
  list: Array<NotificationDTO>
}

export const ListNotifications = async (data: ListNotificationsRequestDTO): Promise<ResponseApi<ListNotificationsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/notifications`);
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