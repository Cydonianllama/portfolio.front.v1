
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { TiFolderOpen } from "react-icons/ti"
import { GoPlus } from "react-icons/go"

export const GetFolder = async (data: GetFoldersRequestDTO): Promise<ResponseApi<GetFoldersResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/folders?page=${data.page}&workspaceId=${data.workspaceId}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const UpdateFolder = async (id: string, data: UpdateFolderRequestDTO): Promise<ResponseApi<UpdateFolderResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/folders/${id}`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const CreateFolder = async (data: CreateFolderRequestDTO): Promise<ResponseApi<CreateFolderResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/folders`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const DeleteFolder = async (data: DeleteFolderRequestDTO): Promise<ResponseApi<DeleteFolderResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/folders/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


///
/// DTOs
///

export interface FolderDTO {
  id: string;
  name: string;
  module: string;
  creationDate: Date;
  workspaceId: string;
}

// get one
export interface GetFolderRequestDTO {
  id: string;
}

export interface GetFolderResponseDTO {
  folder: FolderDTO | null
}

// get many
export interface GetFoldersRequestDTO {
  page: number,
  workspaceId: string
}

export interface GetFoldersResponseDTO {
  list: Array<FolderDTO>
}

// update one
export interface UpdateFolderRequestDTO {
  name: string;
  workspaceId: string;
}

export interface UpdateFolderResponseDTO {
  folder: FolderDTO | null
}

// delete one
export interface DeleteFolderRequestDTO {
  id: string
}

export interface DeleteFolderResponseDTO {
  id: string
}

// create one
export interface CreateFolderRequestDTO {
  name: string;
  module: string;
  workspaceId: string;
}

export interface CreateFolderResponseDTO {
  folder: FolderDTO | null
}
// #endregion API