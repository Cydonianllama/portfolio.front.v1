/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '../models/dto';
import { DeleteItemRequestDTO, DeleteItemResponseDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'

export const DeleteItemService = async (config: DeleteItemRequestDTO): Promise<ResponseApi<DeleteItemResponseDTO> | null>  => {
  try {
    // const req = await api.delete(`${configurationModule.mainAPIroute}`)
    // return req.data;
    
    await sleep(2000)
    return {
      status: true,
      data: {
        id: config.id
      }
    };
  } catch (ex) {
    return null;
  }
}