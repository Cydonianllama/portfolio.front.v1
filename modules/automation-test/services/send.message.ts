
// ______________ Service

import { MessageDTO } from '@/api/chat/chat.dto';
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export interface SendMessageTestAutomationRequestDTO {
  roomId: string,
  message: string
}

interface SendMessageTestAutomationResponseDTO {
  message: MessageDTO | null
}

export const SendMessageTestAutomation= async (data: SendMessageTestAutomationRequestDTO): Promise<ResponseApi<SendMessageTestAutomationResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/test-automations/send-message`, data);
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