/* eslint-disable @typescript-eslint/no-empty-object-type */
// request

import { UserInternalRol, UserStatus } from "@/models/user";

export interface CreateItemRequestDTO {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateItemRequestDTO {
  fullname?: string;
  username?: string;
  email?: string;
  status?: UserStatus;
  internalRol?: UserInternalRol;
  id: string;
}

export interface UpdatePasswordRequestDTO {
  id: string;
  password: string;
}

export interface GetUserWorkspacesRequestDTO {
  userId: string;
  page: number;
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
  internalRol?: UserInternalRol | null
  qtyWorkspaces: number
  creationDate: Date
}

export interface UserWorkspaceDTO {
  id: string;
  name: string;
  creationDate: Date
}

export interface CreateUserResponseDTO {
  user: UserDTO | null
}

export interface UpdateUserResponseDTO {
  automation: UserDTO | null
}

export interface UpdateUserPasswordResponseDTO {
  user: UserDTO | null
}

export interface GetUsersResponseDTO {
  list: Array<UserDTO>
}

export interface GetUserResponseDTO {
  user: UserDTO | null
}

export interface GetUserWorkspacesResponseDTO {
  list: Array<UserWorkspaceDTO>
}

export interface DeleteUserResponseDTO {
  id: string
}

export interface DeleteItemResponseDTO {
  id: string
}
