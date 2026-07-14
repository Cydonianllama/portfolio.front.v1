/*
/api/entity_api
name_entity
property_entity
*/
// #region API
//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';

export const Getname_entity = async (data: Getname_entitysRequestDTO): Promise<ResponseApi<Getname_entitysResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/entity_api?page=${data.page}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const Updatename_entity = async (data: Updatename_entityRequestDTO): Promise<ResponseApi<Updatename_entityResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/entity_api/${data.id}`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const Createname_entity = async (data: Createname_entityRequestDTO): Promise<ResponseApi<Createname_entityResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/entity_api`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const Deletename_entity = async (data: Deletename_entityRequestDTO): Promise<ResponseApi<Deletename_entityResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/entity_api/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


///
/// DTOs
///

export interface name_entityDTO {
  id: string;
  name: string
}

// get one
export interface Getname_entityRequestDTO {
  id: string;
}

export interface Getname_entityResponseDTO {
  property_entity: name_entityDTO | null
}

// get many
export interface Getname_entitysRequestDTO {
  page: number
}

export interface Getname_entitysResponseDTO {
  list: Array<name_entityDTO>
}

// update one
export interface Updatename_entityRequestDTO {
  id: string;
  name: string;
}

export interface Updatename_entityResponseDTO {
  property_entity: name_entityDTO | null
}

// delete one
export interface Deletename_entityRequestDTO {
  id: string
}

export interface Deletename_entityResponseDTO {
  id: string
}

// create one
export interface Createname_entityRequestDTO {
  name: string;
}

export interface Createname_entityResponseDTO {
  property_entity: name_entityDTO | null
}