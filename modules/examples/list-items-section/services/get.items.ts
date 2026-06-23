/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { GetItemResponseDTO, GetItemsRequestDTO } from '../models/dto';

export const GetItem = async (data: GetItemsRequestDTO) : Promise<ResponseApi<GetItemResponseDTO> | null> => {
  try {
    const req = await api.get(`/`)
    return req.data;
  } catch (error) {
    return null
  }
}