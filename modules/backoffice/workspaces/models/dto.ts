/* eslint-disable @typescript-eslint/no-empty-object-type */
// request

export interface GetWorkspacesRequestDTO {
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

//
// user
//
export interface UserSelectionDTO {
  id: string
  name: string
  email: string
  role: string
  profileURL: string
}

//
// members
//

export const DEFAULT_ROLES = {
  ADMIN: "defaultRol::admin",
  AGENTE: "defaultRol::agente",
} as const;

export interface MemberBackofficeDTO {
  id: string;
  email: string;
  userId: string | null;
  workspaceId: string;
  status: number;
  statusName: string;
  invitationAccepted: boolean;
  invitationAcceptedDate: Date | null;
  rolId: string;
  creationDate: Date;
  isOwner: boolean;
}

export interface GetMembersRequestDTO {
  workspaceId: string;
  page: number;
}

export interface GetMemberRequestDTO {
  workspaceId: string;
  memberId: string;
}

export interface CreateMemberRequestDTO {
  workspaceId: string;
  email: string;
  rolId?: string;
}

export interface UpdateMemberRequestDTO {
  workspaceId: string;
  memberId: string;
  email?: string;
  status?: number;
  rolId?: string;
  invitationAccepted?: boolean;
  invitationAcceptedDate?: string;
}

export interface DeleteMemberRequestDTO {
  workspaceId: string;
  memberId: string;
}

export interface GetMembersResponseDTO {
  list: Array<MemberBackofficeDTO>;
}

export interface GetMemberResponseDTO {
  member: MemberBackofficeDTO | null;
}

export interface CreateMemberResponseDTO {
  member: MemberBackofficeDTO | null;
}

export interface UpdateMemberResponseDTO {
  member: MemberBackofficeDTO | null;
}

export interface DeleteMemberResponseDTO {
  id: string;
}