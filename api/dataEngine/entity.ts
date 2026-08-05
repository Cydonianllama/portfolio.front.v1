/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export const Getentity = async (data: GetentitysRequestDTO): Promise<ResponseApi<GetentitysResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/workspaces/${data.workspaceId}/dataengine/entities?page=${data.page}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}


export const Updateentity = async (id: string, data: UpdateentityRequestDTO): Promise<ResponseApi<UpdateentityResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/workspaces/${data.workspaceId}/dataengine/entities/${id}`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}

export const Createentity = async (data: CreateentityRequestDTO): Promise<ResponseApi<CreateentityResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/workspaces/${data.workspaceId}/dataengine/entities`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}

export const Deleteentity = async (data: DeleteentityRequestDTO): Promise<ResponseApi<DeleteentityResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/workspaces/${data.workspaceId}/dataengine/entities/${data.id}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}


///
/// DTOs
///

export interface entityDTO {
  id: string;
  name: string
  workspaceId: string
  codeIcon?: string
}

// get one
export interface GetentityRequestDTO {
  id: string;
  workspaceId: string
}

export interface GetentityResponseDTO {
  entity: entityDTO | null
}

// get many
export interface GetentitysRequestDTO {
  page: number
  workspaceId: string;
}

export interface GetentitysResponseDTO {
  list: Array<entityDTO>
}

// update one
export interface UpdateentityRequestDTO {
  name: string;
  workspaceId: string
  codeIcon?: string
}

export interface UpdateentityResponseDTO {
  entity: entityDTO | null
}

// delete one
export interface DeleteentityRequestDTO {
  id: string
  workspaceId: string;
}

export interface DeleteentityResponseDTO {
  id: string
}

// create one
export interface CreateentityRequestDTO {
  name: string;
  workspaceId: string;
  codeIcon?: string;
  fields: Array<{}>
}

export interface CreateentityResponseDTO {
  entity: entityDTO | null
}
// #endregion API
