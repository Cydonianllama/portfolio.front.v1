/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { CreateContactRequestDTO, CreateContactResponseDTO, GetContactRequestDTO, GetContactResponseDTO, UpdateContactRepsonseDTO, UpdateContactRequestDTO } from './contacts.dto';


export const GetContact = async (data: GetContactRequestDTO): Promise<ResponseApi<GetContactResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/contacts/${data.contactId}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const UpdateContact = async (config: UpdateContactRequestDTO): Promise<ResponseApi<UpdateContactRepsonseDTO> | null> => {
  try {
    const req = await api.put(`/api/contacts/${config.id}`, config)
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const CreateContact = async (config: CreateContactRequestDTO): Promise<ResponseApi<CreateContactResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/contacts/`, config)
    return req.data;
  } catch (ex) {
    return null;
  }
}