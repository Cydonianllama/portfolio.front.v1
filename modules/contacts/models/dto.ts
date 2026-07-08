/* eslint-disable @typescript-eslint/no-empty-object-type */

import { ContactDTO } from "@/api/contacts/contacts.dto";

// request

export interface GetContactsRequestDTO {
  query: string;
  page: number;
  workspaceId: string
}

export interface DeleteContactRequestDTO {
  id: string;
}

// response

export interface GetContactResponseDTO {
  contact: ContactDTO | null
}

export interface GetContactsResponseDTO {
  list: Array<ContactDTO>
}

export interface DeleteContactResponseDTO {
  id: string
}