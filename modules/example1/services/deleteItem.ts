/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '@/modules/example1/types/manager.v1';
import { CreateItemRequestDTO, DeleteItemRequestDTO, DeleteItemResponseDTO, GetItemsRequestDTO, UpdateItemRequestDTO } from '../models/dto';
import { sleep } from '../utils/sleep';

export const DeleteItem = async (config: DeleteItemRequestDTO): Promise<ResponseApi<DeleteItemResponseDTO> | null>  => {
  try {
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