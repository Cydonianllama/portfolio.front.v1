/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { GetItemsResponseDTO, ManagerV1Item } from '../models/dto';
import { GetItemsRequestDTO } from '../models/dto';
import { sleep } from '../utils/sleep';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';

export const GetItemsService = async (config: GetItemsRequestDTO): Promise<ResponseApi<GetItemsResponseDTO> | null> => {
  try {
    // const req = await api.get(`${configurationModule.mainAPIroute}`)
    // return req.data;

    await sleep(200);

    // throw 'GA';

    const page = config.page ?? 1;
    const limit = 16;

    const allItems: ManagerV1Item[] = Array.from(
      { length: 100 },
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
      data: { list: items },
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
