import { WorkspaceDTO } from "../workspace/workspace.dto";

// userinformation DTO
export interface GetUserInformationResponse {
  user: UserDTO | null
}

export interface UserDTO {
  id: string;
  name: string;
  email: string
}


// list workspaces user
export interface ListWorkspacesUserDto {
  userId: string
}

export interface ListWorkspacesUserResponseDto {
  list: WorkspaceDTO[]
}
