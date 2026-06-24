/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { CreateItemRequestDTO, CreateItemResponseDTO, DeleteItemRequestDTO, DeleteItemResponseDTO, GetItemResponseDTO, GetItemsRequestDTO, ItemDTO, UpdateItemRequestDTO, UpdateItemResponseDTO } from './dto';
import { sleep } from './utils/sleep';

export const GetItem = async (config: GetItemsRequestDTO): Promise<ResponseApi<GetItemResponseDTO> | null> => {
  try {
    // const req = await api.get(`/`)
    // return req.data;

    await sleep(2000);

    const page = config.page ?? 1;
    const limit = 16;

    const allItems: ItemDTO[] = Array.from(
      { length: 100 },
      (_, index) => ({
        id: `item-${index + 1}`,
        name: `Producto ${index + 1}`,
        color: 'color::green',
        creationDate: new Date(),
        qtyAsociations: 10
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


  } catch (error) {
    return null
  }
}

export const CreateItem = async (config: CreateItemRequestDTO): Promise<ResponseApi<CreateItemResponseDTO> | null> => {
  try {
    // const req = await api.post(`/`)
    // return req.data;

    await sleep(2000);

    return {
      status: true,
      data: {
        item_to_update: {
          id: `item-${Math.ceil(Math.random() * 1000000000)}`,
          name: config.name,
          color: config.color,
          creationDate: new Date(),
          qtyAsociations: 0
        }
      }
    }
  } catch (error) {
    return null
  }
}

export const UpdateItem = async (config: UpdateItemRequestDTO): Promise<ResponseApi<UpdateItemResponseDTO> | null> => {
  try {
    // const req = await api.put(`/`)
    // return req.data;

    await sleep(2000);

    return {
      status: true,
      data: {
        item_to_update: {
          id: config.id,
          name: config.name,
          color: config.color,
          creationDate: new Date(),
          qtyAsociations: 0
        }
      }
    }
  } catch (error) {
    return null
  }
}

export const DeleteItem = async (config: DeleteItemRequestDTO): Promise<ResponseApi<DeleteItemResponseDTO> | null> => {
  try {
    // const req = await api.delete(`/`)
    // return req.data;

    await sleep(2000);

    return {
      status: true,
      data: {
        id: config.id
      }
    }
  } catch (error) {
    return null
  }
}