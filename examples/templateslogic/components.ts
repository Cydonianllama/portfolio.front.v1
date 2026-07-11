/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';


// Reemplazar por los nombre correctos
/*

/api/item/
_Item_
property_name

*/

export const Get_Item_ = async (data: Get_Item_RequestDTO): Promise<ResponseApi<Get_Item_ResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/item/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const Update_Item_ = async (id: string, data: Update_Item_RequestDTO): Promise<ResponseApi<Update_Item_ResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/item/${id}`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const Create_Item_ = async (data: Create_Item_RequestDTO): Promise<ResponseApi<Create_Item_ResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/item/`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const Delete_Item_ = async (data: Delete_Item_RequestDTO): Promise<ResponseApi<Delete_Item_ResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/item/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


///
///
///

export interface _Item_DTO {
  id: string;
  name: string
}

// get one
export interface Get_Item_RequestDTO {
  id: string;
}

export interface Get_Item_ResponseDTO {
  property_name: _Item_DTO | null
}

// get many
export interface Get_Item_RequestDTO {
  page: number
  workspaceId: string;
}

export interface Get_Item_rResponseDTO {
  list: Array<_Item_DTO>
}

// update one
export interface Update_Item_RequestDTO {
  name: string;
}

export interface Update_Item_ResponseDTO {
  property_name: _Item_DTO | null
}

// delete one
export interface Delete_Item_RequestDTO {
  id: string
}

export interface Delete_Item_ResponseDTO {
  id: string
}

// create one
export interface Create_Item_RequestDTO {
  name: string;
}
  
export interface Create_Item_ResponseDTO {
  property_name: _Item_DTO | null
}
  