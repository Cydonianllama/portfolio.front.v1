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

export const GetItems = async (
  config: GetItemsConfig
): Promise<ResponseApi<Array<ManagerV1Item>> | null> => {
  try {
    await sleep(2000);

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

