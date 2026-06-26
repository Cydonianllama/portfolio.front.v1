/* eslint-disable @typescript-eslint/no-empty-object-type */

import { UserStatus } from "./user";

export interface GetUsersRequestDTO {
  query: string;
  page: number;
}

export interface GetUserResponseDTO {
  list: Array<UserDTO>
}

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