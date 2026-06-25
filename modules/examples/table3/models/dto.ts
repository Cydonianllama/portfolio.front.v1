/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface ManagerV1Item {
  id: string;
  name: string;
  description: string;
  qtyItem: number;
  isPublish: boolean;
  statusCode: number;
  statusName: string;
  creationDate: Date;
}


// request

export interface GetItemsRequestDTO {
  query: string;
  page: number;
}

export interface CreateItemRequestDTO {
  name: string;
  description: string;
  qty: number
}

export interface UpdateItemRequestDTO {
  id: string;
  name: string;
  description: string;
  qty: number;
}

export interface DeleteItemRequestDTO {
  id: string;
}


// response
export interface CreateItemResponseDTO {
  item_to_replace: ManagerV1Item | null
}

export interface UpdateItemRepsonseDTO {
  item_to_replace: ManagerV1Item | null
}

export interface GetItemResponseDTO {
  item_to_replace: ManagerV1Item | null
}

export interface GetItemsResponseDTO {
  list: Array<ManagerV1Item>
}

export interface DeleteItemResponseDTO {
  id: string
}