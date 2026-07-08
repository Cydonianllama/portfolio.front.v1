/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { CreateContactRequestDTO, CreateContactResponseDTO } from '@/api/contacts/contacts.dto';
import { CreateContact } from '@/api/contacts/contacts.api';

export const CreateContactService = async (config: CreateContactRequestDTO): Promise<ResponseApi<CreateContactResponseDTO> | null> => {
  try {
    const req = await CreateContact(config)
    return req;
  } catch (ex) {
    return null;
  }
}