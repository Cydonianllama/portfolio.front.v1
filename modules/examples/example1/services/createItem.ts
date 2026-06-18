/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '@/modules/examples/example1/types/manager.v1';
import { CreateItemRequestDTO, DeleteItemRequestDTO, DeleteItemResponseDTO, GetItemsRequestDTO, UpdateItemRequestDTO } from '../models/dto';
import { sleep } from '../utils/sleep';


export const CreateItem = async (config: CreateItemRequestDTO): Promise<ResponseApi<ManagerV1Item> | null>  => {
  try {
    await sleep(2000)
    return {
      status: true,
      data: {
        creationDate: new Date(),
        description: config.description,
        id: `item-${Math.ceil(Math.random()*100000)}`,
        isPublish: false,
        name: config.name,
        qtyItem: config.qty,
        statusCode: 1,
        statusName: 'Active'
      }
    };
  } catch (ex) {
    // console.log(ex.message)
    return null;
  }
}
