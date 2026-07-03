
// create workpace
export interface CreateWorkspaceDto {
  name: string
}

export interface CreateWorkspaceResponseDto {
  workspace: WorkspaceSelectionDTO | null
}

// list workspaces user
export interface ListWorkspacesUserDto {
  userId: string
}

export interface ListWorkspacesUserResponseDto {
  list: WorkspaceSelectionDTO[]
}

// delete workspace
export interface DeleteWorkspaceDto {
  workspaceId: string
}

export interface DeleteWorkspaceResponseDto {
  id: string
}


// workspace DTO
export interface WorkspaceSelectionDTO {
  id: string
  name: string
  logoURL: string
}