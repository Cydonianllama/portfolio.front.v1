/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '@/modules/example1/types/manager.v1';

// util
const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export interface GetItemsConfig {
  query: string;
  page: number;
}

export const GetItems = async (config: GetItemsConfig) : Promise<ResponseApi<Array<ManagerV1Item>> | null>  =>  {
  try {
    return {
      data: [
        {
          id: '1',
          description: 'Descripcion del producto',
          isPublish: true,
          name: 'nombre producto',
          qtyItem: 120
        },
        {
          id: '2',
          description: 'Descripcion del producto',
          isPublish: true,
          name: 'nombre producto 2',
          qtyItem: 10
        },
        {
          id: '3',
          description: 'Descripcion del producto',
          isPublish: true,
          name: 'nombre producto 3',
          qtyItem: 2
        }
      ],
      status: true,
      message: '',
      pagination: {
        hasNextPage: false,
        hasPreviousPage: false,
        limit: 20,
        page: 1,
        total: 20,
        totalPages: 1
      }
    }
  } catch (error) {
    return null;
  }
}

export const CreateItem = async () => {
  try {
    await sleep(2000)
  } catch (ex) {

  }
}

export const UpdateItem = async () => {
  try {
    await sleep(2000)
  } catch (ex) {

  }
}

export const DeleteItem = async () => {
  try {
    await sleep(2000)
  } catch (ex) {

  }
}

