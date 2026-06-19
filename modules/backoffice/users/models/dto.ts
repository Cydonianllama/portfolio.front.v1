/* eslint-disable @typescript-eslint/no-empty-object-type */
// request

import { UserStatus } from "@/models/user";

export interface CreateItemRequestDTO {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateItemRequestDTO {
  fullname: string;
  username: string;
  email: string;
  id: string;
}

export interface GetItemsRequestDTO {
  query: string;
  page: number;
}

export interface DeleteItemRequestDTO {
  id: string;
}


// response

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  fullname: string;
  status: UserStatus
  statusName: string
  qtyWorkspaces: number
  creationDate: Date
}

export interface CreateUserResponseDTO {
  user: UserDTO | null
}

export interface UpdateUserResponseDTO {
  automation: UserDTO | null
}

export interface GetUsersResponseDTO {
  list: Array<UserDTO>
}

export interface GetUserResponseDTO {
  user: UserDTO | null
}

export interface DeleteUserResponseDTO {
  id: string
}

export interface DeleteItemResponseDTO {
  id: string
}