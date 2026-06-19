/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '../models/dto';
import { CreateItemRequestDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';


export const CreateItem = async (config: CreateItemRequestDTO): Promise<ResponseApi<{ item: ManagerV1Item }> | null> => {
  try {
    // const req = await api.post(`${configurationModule.mainAPIroute}`, {})
    // return req.data;

    await sleep(2000)
    return {
      status: true,
      data: {
        item: {
          creationDate: new Date(),
          description: config.description,
          id: `item-${Math.ceil(Math.random() * 100000)}`,
          isPublish: false,
          name: config.name,
          qtyItem: config.qty,
          statusCode: 1,
          statusName: 'Active'
        }
      }
    };
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
