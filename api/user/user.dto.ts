/* eslint-disable @typescript-eslint/no-empty-object-type */
import { WorkspaceDTO } from "../workspace/workspace.dto";

export interface UserDTO {
  id: string;
  fullname: string;
  email: string
}

// list workspaces user
export interface ListWorkspacesUserDto {
  userId: string
}

export interface ListWorkspacesUserResponseDto {
  list: WorkspaceDTO[]
}

// userinformation DTO
export interface GetUserInformationResponse {
  user: UserDTO | null
}

// Update
export interface UpdateUserRequestDTO {
  fullname: string
}

export interface UpdateUserResponse {
  user: UserDTO | null
}