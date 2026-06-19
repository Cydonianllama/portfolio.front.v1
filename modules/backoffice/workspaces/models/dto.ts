/* eslint-disable @typescript-eslint/no-empty-object-type */
// request

export interface GetItemsRequestDTO {
  query: string;
  page: number;
}

export interface DeleteItemRequestDTO {
  id: string;
}

export interface CreateItemRequestDTO {
  name: string;
  mainUserId: string
}

export interface UpdateItemRequestDTO {
  name: string;
  mainUserId: string;
  id: string
}

//

export interface WorkspaceDTO {
  id: string;
  name: string;
  creationDate: Date,
  mainUser?: {
    id: string;
    name: string;
    email: string;
    username: string;
  } | null
}

// response
export interface CreateWorkspaceResponseDTO {
  workspace: WorkspaceDTO | null
}

export interface DeleteWorkspaceResponseDTO {
  id: string
}

export interface GetWorkspaceResponseDTO {
  workspace: WorkspaceDTO | null
}

export interface GetWorkspacesResponseDTO {
  list: Array<WorkspaceDTO>
}

export interface UpateWorkspaceResponseDTO {
  workspace: WorkspaceDTO | null
}