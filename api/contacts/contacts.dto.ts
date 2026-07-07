/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface ContactDTO {
  id: string;
  fullname: string;
}

// get one

export interface GetContactRequestDTO {
  contactId: string;
}

export interface GetContactResponseDTO {
  contact: ContactDTO | null
}