export interface ItemDTO {
  id: string;
  name: string;
  color?: string;
  qtyAsociations?: number;
  creationDate?: Date;
}

// request
export interface GetItemsRequestDTO {
  page: number;
  query: string
}

export interface CreateItemRequestDTO {
  name: string;
  color: string;
}

export interface UpdateItemRequestDTO {
  name: string;
  color: string;
  id: string
}

export interface DeleteItemRequestDTO {
  id: string
}


// response
export interface GetItemResponseDTO {
  list: Array<ItemDTO>
}

export interface CreateItemResponseDTO {
  item_to_update: ItemDTO | null
}

export interface UpdateItemResponseDTO {
  item_to_update: ItemDTO | null
}

export interface DeleteItemResponseDTO {
  id: string
}