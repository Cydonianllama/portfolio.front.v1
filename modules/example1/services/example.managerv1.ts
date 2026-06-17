/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ManagerV1Item } from '@/modules/example1/types/manager.v1';
import { CreateItemRequestDTO, DeleteItemRequestDTO, DeleteItemResponseDTO, GetItemsRequestDTO, UpdateItemRequestDTO } from '../models/dto';

// util
const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const GetItems = async (config: GetItemsRequestDTO): Promise<ResponseApi<Array<ManagerV1Item>> | null> => {
  try {
    await sleep(1000);

    const page = config.page ?? 1;
    const limit = 16;

    const allItems: ManagerV1Item[] = Array.from(
      { length: 600 },
      (_, index) => ({
        id: `item-${index + 1}`,
        name: `Producto ${index + 1}`,
        description: `Descripción producto ${index + 1}`,
        isPublish: index % 2 === 0,
        qtyItem: Math.floor(Math.random() * 500),
        statusCode: 1,
        statusName: 'Accepted',
        creationDate: new Date(Date.now())
      })
    );

    const start = (page - 1) * limit;
    const end = start + limit;

    const items = allItems.slice(start, end);

    const total = allItems.length;
    const totalPages = Math.ceil(total / limit);

    return {
      status: true,
      message: "",
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch {
    return null;
  }
};

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

export const UpdateItem = async (config: UpdateItemRequestDTO): Promise<ResponseApi<ManagerV1Item> | null>  => {
  try {
    await sleep(2000)
    return {
      status: true,
      data: {
        creationDate: new Date(),
        description: config.description,
        id: config.id,
        isPublish: false,
        name: config.name,
        qtyItem: config.qty,
        statusCode: 1,
        statusName: 'Active'
      }
    };
  } catch (ex) {
    return null;
  }
}

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

