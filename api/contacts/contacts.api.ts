/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { GetContactRequestDTO, GetContactResponseDTO } from './contacts.dto';


export const GetContact = async (data: GetContactRequestDTO): Promise<ResponseApi<GetContactResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/contacts/${data.contactId}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}