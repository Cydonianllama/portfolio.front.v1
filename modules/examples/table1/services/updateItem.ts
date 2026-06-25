/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item, UpdateItemRepsonseDTO } from '../models/dto';
import { UpdateItemRequestDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const UpdateItemService = async (config: UpdateItemRequestDTO): Promise<ResponseApi<UpdateItemRepsonseDTO> | null> => {
  try {
    // const req = await api.put(`${configurationModule.mainAPIroute}`, {})
    // return req.data;

    await sleep(2000)
    return {
      status: true,
      data: {
        item_to_replace: {
          creationDate: new Date(),
          description: config.description,
          id: config.id,
          isPublish: false,
          name: config.name,
          qtyItem: config.qty,
          statusCode: 1,
          statusName: 'Active'
        }
      }
    };
  } catch (ex) {
    return null;
  }
}



