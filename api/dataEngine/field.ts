// Reemplazar por los nombre correctos
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { UseAppData } from "@/hooks/app/useAppData"
import { EntityFieldType } from '@erick/dataengine';


export const GetField = async (data: GetFieldsRequestDTO): Promise<ResponseApi<GetFieldsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/workspaces/${data.workspaceId}/dataengine/fields?page=${data.page}&entityId=${data.entityId}`);
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


export const UpdateField = async (id: string, data: UpdateFieldRequestDTO): Promise<ResponseApi<UpdateFieldResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/workspaces/${data.workspaceId}/dataengine/fields/${id}`, data);
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

export const CreateField = async (data: CreateFieldRequestDTO): Promise<ResponseApi<CreateFieldResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/workspaces/${data.workspaceId}/dataengine/fields`, data);
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

export const DeleteField = async (data: DeleteFieldRequestDTO): Promise<ResponseApi<DeleteFieldResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/workspaces/${data.workspaceId}/dataengine/fields/${data.id}`);
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

export interface FieldDTO {
  id: string;
  name: string
  type: EntityFieldType,
  entityId: string
  color?: string | null;
  icon?: string | null;
}

// get one
export interface GetFieldRequestDTO {
  id: string;
  workspaceId: string
}

export interface GetFieldResponseDTO {
  field: FieldDTO | null
}

// get many
export interface GetFieldsRequestDTO {
  page: number
  workspaceId: string
  entityId: string;
}

export interface GetFieldsResponseDTO {
  list: Array<FieldDTO>
}

// update one
export interface UpdateFieldRequestDTO {
  name: string;
  workspaceId: string
}

export interface UpdateFieldResponseDTO {
  field: FieldDTO | null
}

// delete one
export interface DeleteFieldRequestDTO {
  id: string
  workspaceId: string
}

export interface DeleteFieldResponseDTO {
  id: string
}

// create one
export interface CreateFieldRequestDTO {
  name: string;
  workspaceId: string
  type: EntityFieldType,
  entityId: string
}

export interface CreateFieldResponseDTO {
  field: FieldDTO | null
}
// #endregion API