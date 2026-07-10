// update workspace
export interface UpdateWorkspaceRequestDTO {
  name: string;
}

export interface UpdateWorkspaceResponseDTO {
  workspace: WorkspaceDTO;
}


// create workpace
export interface CreateWorkspaceDto {
  name: string
}

export interface CreateWorkspaceResponseDto {
  workspace: WorkspaceDTO | null
}

// delete workspace
export interface DeleteWorkspaceDto {
  workspaceId: string
}

export interface DeleteWorkspaceResponseDto {
  id: string
}

// workspace DTO
export interface WorkspaceDTO {
  id: string
  name: string
  logoURL: string
}