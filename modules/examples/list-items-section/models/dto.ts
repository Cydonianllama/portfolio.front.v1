import { ItemDTO } from "./model";

export interface GetItemsRequestDTO {
  page: number;
  query: string
}

export interface GetItemResponseDTO {
  list: Array<ItemDTO>
}