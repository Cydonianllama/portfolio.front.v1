/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ResponseApi } from '@/types/api/response';
import { api } from '@/setup/axios'
import { configurationModule } from '../config';
import { UpdateContactRepsonseDTO, UpdateContactRequestDTO } from '@/api/contacts/contacts.dto';
import { UpdateContact } from '@/api/contacts/contacts.api';

export const UpdateContactService = async (config: UpdateContactRequestDTO): Promise<ResponseApi<UpdateContactRepsonseDTO> | null> => {
  try {
    const req = await UpdateContact(config)
    return req;
  } catch (ex) {
    return null;
  }
}



