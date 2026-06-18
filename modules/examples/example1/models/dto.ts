/* eslint-disable @typescript-eslint/no-empty-object-type */
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

// export interface CreateItemResponseDTO {
// }

// export interface UpdateItemRequestDTO {
// }

export interface DeleteItemResponseDTO {
  id: string
}