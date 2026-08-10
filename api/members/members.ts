import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from "axios"


export const GetMember = async (data: GetMembersRequestDTO): Promise<ResponseApi<GetMembersResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/members?page=${data.page}&workspaceId=${data.workspaceId}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null;
  }
}


export const UpdateMember = async (id: string, data: UpdateMemberRequestDTO): Promise<ResponseApi<UpdateMemberResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/members/${id}`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null;
  }
}

export const CreateMember = async (data: CreateMemberRequestDTO): Promise<ResponseApi<CreateMemberResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/members`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null;
  }
}

export const DeleteMember = async (data: DeleteMemberRequestDTO): Promise<ResponseApi<DeleteMemberResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/members/${data.id}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null;
  }
}


///
/// DTOs
///

export enum InvitationMemberStatus {
  pending = 1,
  acepted = 2,
  rechazed = 3,
}

export enum MemberStatus {
  active = 2,
  disabled = 4,
}

export const MemberStatusConfiguration: Record<MemberStatus, { text: string }> = {
  [MemberStatus.active]: { text: "Activo" },
  [MemberStatus.disabled]: { text: "Deshabilitado" },
};

export const configurationDefaultRoles: Record<DefaultRole, { text: string }> = {
  "defaultRol::admin": {
    text: 'Administrador',
  },
  "defaultRol::operator": {
    text: 'Operador'
  }
}

export const DEFAULT_ROLES = {
  ADMIN: "defaultRol::admin",
  OPERATOR: "defaultRol::operator",
} as const;

export type DefaultRole = typeof DEFAULT_ROLES[keyof typeof DEFAULT_ROLES];

export interface MemberDTO {
  id: string;
  email: string
  workspaceId: string
  rolId: string
  creationDate: Date
  isOwner: boolean
  status: MemberStatus,
  invitation: {
    status: InvitationMemberStatus,
    acceptedDate: Date
  } | null
}

// get one
export interface GetMemberRequestDTO {
  id: string;
}

export interface GetMemberResponseDTO {
  member: MemberDTO | null
}

// get many
export interface GetMembersRequestDTO {
  page: number
  workspaceId: string;
}

export interface GetMembersResponseDTO {
  list: Array<MemberDTO>
}

// update one
export interface UpdateMemberRequestDTO {
  rolId: string;
  status: number;
  workspaceId: string;
}

export interface UpdateMemberResponseDTO {
  member: MemberDTO | null
}

// delete one
export interface DeleteMemberRequestDTO {
  id: string
}

export interface DeleteMemberResponseDTO {
  id: string
}

// create one
export interface CreateMemberRequestDTO {
  email: string;
  rolId: string;
  workspaceId: string;
}

export interface CreateMemberResponseDTO {
  member: MemberDTO | null
}
// #endregion API