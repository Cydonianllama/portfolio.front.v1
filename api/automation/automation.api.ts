import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { UpdateAutomationRequestDTO, UpdateAutomationResponseDTO } from './automation.dto';

export const UpdateAutomation = async (id: string, data: UpdateAutomationRequestDTO): Promise<ResponseApi<UpdateAutomationResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/automations/${id}`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      return ex.response?.data ?? null;
    }
    return null
  }
}
